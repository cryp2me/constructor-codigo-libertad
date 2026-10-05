-- Constructor CVM · esquema inicial
-- Cada tabla replica una entity de Base44. Los campos que el frontend
-- envíe y no tengan columna propia se guardan en `extra` (jsonb), así
-- añadir un campo nuevo en la UI nunca rompe un insert.

create extension if not exists pgcrypto;

-- Trigger común: mantiene updated_date al día
create or replace function public.touch_updated_date()
returns trigger language plpgsql as $$
begin
  new.updated_date = now();
  return new;
end $$;

-- Ajustes por usuario (motor de IA preferido)
create table public.user_settings (
  user_id uuid primary key references auth.users (id) on delete cascade default auth.uid(),
  ai_provider text not null default 'anthropic' check (ai_provider in ('anthropic', 'openai')),
  created_date timestamptz not null default now(),
  updated_date timestamptz not null default now()
);

create table public.brand_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade default auth.uid(),
  nombre_marca text, nombre_personal text, nicho text, subnicho text,
  cliente_ideal_quien text, cliente_ideal_duele text, cliente_ideal_desea text, cliente_ideal_objeciones text,
  transformacion_de text, transformacion_a text, propuesta_valor text, historia_personal text,
  tono_voz text, nivel_formalidad text default 'cercano', ejemplos_como_hablo text, enlace_drive text,
  pilares_contenido jsonb not null default '[]', expresiones_que_uso jsonb not null default '[]',
  muletillas jsonb not null default '[]', palabras_prohibidas jsonb not null default '[]',
  palabras_clave_nicho jsonb not null default '[]', productos jsonb not null default '[]',
  lead_magnets jsonb not null default '[]', ctas_favoritos jsonb not null default '[]',
  colores_marca jsonb not null default '[]', tipografias jsonb not null default '[]',
  archivos jsonb not null default '[]',
  extra jsonb not null default '{}',
  created_date timestamptz not null default now(),
  updated_date timestamptz not null default now()
);

create table public.content_pieces (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade default auth.uid(),
  titulo text, hook text, guion_modelado text, caption text, cta text, palabra_clave_cta text,
  formato text, objetivo text, estado text default 'idea', origen text, notas text,
  enlace_drive text, prompt_diseno text, fecha_publicacion date,
  slides jsonb not null default '[]',
  extra jsonb not null default '{}',
  created_date timestamptz not null default now(),
  updated_date timestamptz not null default now()
);

create table public.resources (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade default auth.uid(),
  titulo text, tipo text default 'nota', contenido text,
  etiquetas jsonb not null default '[]',
  paso_relacionado text default 'general',
  favorito boolean not null default false,
  es_del_sistema boolean not null default false,
  extra jsonb not null default '{}',
  created_date timestamptz not null default now(),
  updated_date timestamptz not null default now()
);

create table public.step_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade default auth.uid(),
  paso int not null,
  tareas_completadas jsonb not null default '[]',
  completado boolean not null default false,
  extra jsonb not null default '{}',
  created_date timestamptz not null default now(),
  updated_date timestamptz not null default now(),
  unique (user_id, paso)
);

create table public.monthly_archives (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade default auth.uid(),
  mes text, archivado_el date,
  resumen jsonb not null default '{}',
  extra jsonb not null default '{}',
  created_date timestamptz not null default now(),
  updated_date timestamptz not null default now()
);

-- updated_date + RLS (cada usuario solo ve y toca lo suyo)
do $$
declare t text;
begin
  foreach t in array array['user_settings','brand_profiles','content_pieces','resources','step_progress','monthly_archives'] loop
    execute format('create trigger %I_touch before update on public.%I for each row execute function public.touch_updated_date()', t, t);
    execute format('alter table public.%I enable row level security', t);
    execute format('create policy "own rows" on public.%I for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid())', t);
  end loop;
end $$;

create index on public.brand_profiles (user_id);
create index on public.content_pieces (user_id, created_date desc);
create index on public.resources (user_id, updated_date desc);
create index on public.monthly_archives (user_id, created_date desc);

-- Storage: archivos de marca privados, una carpeta por usuario
insert into storage.buckets (id, name, public) values ('brand-files', 'brand-files', false)
on conflict (id) do nothing;

create policy "brand-files own folder read" on storage.objects for select to authenticated
  using (bucket_id = 'brand-files' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "brand-files own folder write" on storage.objects for insert to authenticated
  with check (bucket_id = 'brand-files' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "brand-files own folder delete" on storage.objects for delete to authenticated
  using (bucket_id = 'brand-files' and (storage.foldername(name))[1] = auth.uid()::text);
