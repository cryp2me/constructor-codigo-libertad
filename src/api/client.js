// Cliente del backend (Supabase). Mantiene la misma forma que el SDK de
// Base44 que usaba la app original (entities.X.list/filter/create/update…,
// functions.invoke, integrations.Core.UploadPrivateFile) para que las
// páginas no cambien.
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

// entity -> tabla y columnas propias. Cualquier otro campo va a `extra`.
const SCHEMA = {
  BrandProfile: {
    table: "brand_profiles",
    columns: [
      "nombre_marca", "nombre_personal", "nicho", "subnicho",
      "cliente_ideal_quien", "cliente_ideal_duele", "cliente_ideal_desea", "cliente_ideal_objeciones",
      "transformacion_de", "transformacion_a", "propuesta_valor", "historia_personal",
      "tono_voz", "nivel_formalidad", "ejemplos_como_hablo", "enlace_drive",
      "pilares_contenido", "expresiones_que_uso", "muletillas", "palabras_prohibidas",
      "palabras_clave_nicho", "productos", "lead_magnets", "ctas_favoritos",
      "colores_marca", "tipografias", "archivos",
    ],
  },
  ContentPiece: {
    table: "content_pieces",
    columns: [
      "titulo", "hook", "guion_modelado", "caption", "cta", "palabra_clave_cta", "formato",
      "objetivo", "estado", "origen", "notas", "enlace_drive", "prompt_diseno",
      "fecha_publicacion", "slides",
    ],
  },
  Resource: {
    table: "resources",
    columns: ["titulo", "tipo", "contenido", "etiquetas", "paso_relacionado", "favorito", "es_del_sistema"],
  },
  StepProgress: { table: "step_progress", columns: ["paso", "tareas_completadas", "completado"] },
  MonthlyArchive: { table: "monthly_archives", columns: ["mes", "archivado_el", "resumen"] },
};

const SYSTEM_FIELDS = new Set(["id", "user_id", "created_date", "updated_date", "extra", "created_by"]);

function toRow(entity, data, previousExtra = {}) {
  const { columns } = SCHEMA[entity];
  const row = {};
  const extra = { ...previousExtra };
  for (const [key, value] of Object.entries(data)) {
    if (SYSTEM_FIELDS.has(key)) continue;
    if (columns.includes(key)) row[key] = value;
    else extra[key] = value;
  }
  if (Object.keys(extra).length) row.extra = extra;
  return row;
}

function fromRow(row) {
  if (!row) return row;
  const { extra, ...rest } = row;
  return { ...(extra || {}), ...rest };
}

function unwrap({ data, error }) {
  if (error) throw error;
  return data;
}

// "-created_date" -> order by created_date desc
function applySort(query, sort) {
  if (!sort) return query.order("created_date", { ascending: true });
  const desc = sort.startsWith("-");
  return query.order(desc ? sort.slice(1) : sort, { ascending: !desc });
}

function entity(name) {
  const { table } = SCHEMA[name];
  return {
    async list(sort, limit) {
      let query = applySort(supabase.from(table).select("*"), sort);
      if (limit) query = query.limit(limit);
      return unwrap(await query).map(fromRow);
    },
    async filter(where = {}, sort, limit) {
      let query = applySort(supabase.from(table).select("*").match(where), sort);
      if (limit) query = query.limit(limit);
      return unwrap(await query).map(fromRow);
    },
    async get(id) {
      return fromRow(unwrap(await supabase.from(table).select("*").eq("id", id).single()));
    },
    async create(data) {
      return fromRow(unwrap(await supabase.from(table).insert(toRow(name, data)).select().single()));
    },
    async update(id, data) {
      const current = unwrap(await supabase.from(table).select("extra").eq("id", id).single());
      const row = toRow(name, data, current?.extra || {});
      return fromRow(unwrap(await supabase.from(table).update(row).eq("id", id).select().single()));
    },
    async updateMany(where = {}, { $set = {} } = {}) {
      // RLS limita el update a las filas del usuario actual.
      let query = supabase.from(table).update(toRow(name, $set));
      query = Object.keys(where).length ? query.match(where) : query.not("id", "is", null);
      return unwrap(await query.select()).map(fromRow);
    },
    async delete(id) {
      unwrap(await supabase.from(table).delete().eq("id", id));
    },
  };
}

async function currentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    const err = new Error("No autenticado");
    err.status = 401;
    throw err;
  }
  return { id: user.id, email: user.email, full_name: user.user_metadata?.full_name || "" };
}

export const api = {
  entities: Object.fromEntries(Object.keys(SCHEMA).map((name) => [name, entity(name)])),

  auth: {
    me: currentUser,
    async updateMe(data) {
      unwrap(await supabase.auth.updateUser({ data }));
      return currentUser();
    },
    async logout(redirectTo) {
      await supabase.auth.signOut();
      if (redirectTo) window.location.href = redirectTo;
    },
  },

  functions: {
    async invoke(name, body) {
      const { data, error } = await supabase.functions.invoke(name, { body });
      if (error) {
        // Las funciones devuelven { error } con un mensaje legible.
        const detail = await error.context?.json?.().catch(() => null);
        return { data: { error: detail?.error || error.message } };
      }
      return { data };
    },
  },

  integrations: {
    Core: {
      async UploadPrivateFile({ file }) {
        const user = await currentUser();
        const path = `${user.id}/${Date.now()}-${file.name.replace(/[^\w.-]+/g, "_")}`;
        unwrap(await supabase.storage.from("brand-files").upload(path, file));
        // URL firmada de larga duración para poder mostrar la imagen.
        const { signedUrl } = unwrap(
          await supabase.storage.from("brand-files").createSignedUrl(path, 60 * 60 * 24 * 365),
        );
        return { file_uri: signedUrl, path };
      },
    },
  },
};
