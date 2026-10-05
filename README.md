# Constructor CVM · Código Libertad

Clon de **Constructor CVM** (https://libertad-content-lab.base44.app) sin dependencia de Base44:
frontend Vite + React + Tailwind y backend en **Supabase** con IA intercambiable (**Claude o ChatGPT**).

![Inicio](docs/preview-inicio.png)

## Arquitectura

| Capa | Tecnología | Dónde |
| --- | --- | --- |
| UI | React 18, React Router 6, Tailwind 3 | `src/` |
| Datos | Postgres + RLS (cada usuario solo ve lo suyo) | `supabase/migrations/` |
| Auth | Supabase Auth (email + contraseña, Google opcional) | `src/pages/auth/` |
| Archivos | Supabase Storage, bucket privado `brand-files` | `src/api/client.js` |
| IA | Edge Functions `aiMarca` y `aiCarrusel` | `supabase/functions/` |

`src/api/client.js` expone la misma interfaz que el SDK de Base44 (`api.entities.X.list/create/update…`,
`api.functions.invoke`), así que las páginas no saben qué backend hay debajo.

### Funciones de IA

| Función | Acción | Entrada | Salida |
| --- | --- | --- | --- |
| `aiMarca` | `voz` | `ejemplos` (textos tuyos) | `tono_voz`, `expresiones_que_uso`, `muletillas`, `nivel_formalidad`, `resumen` |
| `aiMarca` | `cliente_ideal` | `notas` | `cliente_ideal_quien/duele/desea/objeciones` |
| `aiCarrusel` | `generar` | `idea`, `tipo`, `objetivo`, `num_slides`, `tono` | carrusel completo* |
| `aiCarrusel` | `modelar` | `contenido` (carrusel de referencia), `objetivo` | carrusel completo* |
| `aiCarrusel` | `adaptar_hook` | `hook`, `categoria` | `adaptado`, `explicacion` |

\* `tipo_carrusel`, `hook`, `slides[{titulo, texto}]`, `caption`, `cta`, `palabra_clave_cta`, `prompt_diseno`, `notas`.

Todas leen el **perfil de marca del usuario en el servidor** y lo inyectan en el prompt (voz, expresiones,
palabras prohibidas, CTAs, productos, colores, tipografías). Los prompts se reconstruyeron a partir de pruebas
contra la app original y viven en `supabase/functions/*/index.ts`: edítalos ahí para afinar la calidad.

### Claude o ChatGPT

- Cada usuario elige en **Ajustes → Motor de IA** (tabla `user_settings`).
- Sin elección, se usa el secreto `AI_PROVIDER` (`anthropic` por defecto).
- Ambos proveedores reciben el mismo prompt y el mismo JSON Schema estricto, así que la UI no cambia.
- Modelos configurables por secreto: `ANTHROPIC_MODEL` (por defecto `claude-opus-5-5`) y `OPENAI_MODEL` (por defecto `gpt-4o`).
- Con Claude está activado el *fallback* del servidor: si el modelo rechaza una petición, Anthropic la reintenta con otro modelo automáticamente.

## Puesta en marcha

1. **Crear el proyecto** en https://supabase.com/dashboard.
2. **Base de datos y funciones** (con la [CLI de Supabase](https://supabase.com/docs/guides/cli)):
   ```bash
   supabase link --project-ref TU_PROJECT_REF
   supabase db push
   supabase functions deploy aiMarca
   supabase functions deploy aiCarrusel
   ```
3. **Secretos** (Dashboard → Edge Functions → Secrets, o CLI):
   ```bash
   supabase secrets set ANTHROPIC_API_KEY=... OPENAI_API_KEY=... AI_PROVIDER=anthropic
   ```
   Solo hace falta la clave del proveedor que vayas a usar.
4. **Auth**:
   - Authentication → URL Configuration: añade tu dominio y `http://localhost:5173` a *Redirect URLs*.
   - Authentication → Email Templates → *Confirm signup*: incluye `{{ .Token }}` para que el registro envíe un código de 6 dígitos (la pantalla de registro lo pide).
   - Opcional: activa Google en Authentication → Providers.
5. **Frontend**:
   ```bash
   cp .env.example .env   # pega VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY (Project Settings → API)
   npm install
   npm run dev
   ```
6. **Despliegue**: Vercel o Netlify con las mismas dos variables `VITE_*`. Al ser una SPA, redirige todas las rutas a `index.html`.

## Estructura

```
src/
  api/client.js              cliente Supabase con interfaz tipo Base44
  lib/                       steps (los 8 pasos), constantes, auth, utils
  hooks/useProgress.js       progreso global/por paso
  components/
    layout/                  Sidebar + AppLayout
    steps/                   StepLayout (checklist, herramientas, recursos), ComingSoon
    carruseles/              fórmula, banco de hooks, crear/optimizar, resultado
    forms/                   ListField, RepeaterField, FileUploader
    AiProviderSetting.jsx    selector Claude / ChatGPT
  pages/                     Inicio, Sistema, Marca, Plan, Biblioteca, Producto, Ajustes,
                             ConstructorCarruseles, pasos/Paso1..8, auth/*
supabase/
  migrations/                tablas, RLS, bucket de archivos
  functions/                 aiMarca, aiCarrusel y capa común (_shared/)
```

## Limitaciones conocidas

- Los nombres de **variables locales** dentro de los componentes (`e`, `t`, `n`…) vienen del minificado del original. Componentes, módulos y constantes sí tienen nombres legibles.
- Los prompts de IA son una reconstrucción, no el texto original de Base44 (que no es público). La forma de los datos es idéntica; el estilo de los textos puede variar.
- Los pasos 1-4 y 6-8 muestran "próximamente", igual que en la app original.
