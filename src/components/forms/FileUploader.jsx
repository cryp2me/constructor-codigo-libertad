import {
  LoaderCircle as LoaderCircleIcon,
  Upload as UploadIcon,
  File as FileIcon,
  Trash2 as Trash2Icon,
} from "lucide-react";
import { useState } from "react";
import { api } from "@/api/client";

export function FileUploader({ value: e = [], onChange: t }) {
  let [n, r] = useState(false),
    i = async (n) => {
      let i = Array.from(n.target.files || []);
      if (i.length) {
        r(true);
        try {
          let n = [];
          for (let e of i) {
            let { file_uri: t } =
              await api.integrations.Core.UploadPrivateFile({
                file: e,
              });
            n.push({
              nombre: e.name,
              uri: t,
              tipo: e.type,
            });
          }
          t([...e, ...n]);
        } catch {
          alert(`No se pudo subir el archivo.`);
        } finally {
          (r(false), (n.target.value = ``));
        }
      }
    },
    a = (n) => t(e.filter((e, t) => t !== n));
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-white/90">
        Archivos de marca (logo, fotos, tipografías, plantillas)
      </label>
      <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-background px-4 py-6 text-sm text-muted-foreground hover:border-lima/50 hover:text-lima">
        {n ? (
          <LoaderCircleIcon className="h-4 w-4 animate-spin" />
        ) : (
          <UploadIcon className="h-4 w-4" />
        )}
        <span>{n ? `Subiendo…` : `Haz clic para subir archivos`}</span>
        <input type="file" multiple className="hidden" onChange={i} />
      </label>
      {e.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {e.map((e, t) => (
            <div
              className="group relative overflow-hidden rounded-lg border border-border bg-card"
              key={t}
            >
              {e.tipo?.startsWith(`image/`) ? (
                <img
                  src={e.uri}
                  alt={e.nombre}
                  className="h-24 w-full object-contain"
                />
              ) : (
                <div className="flex h-24 w-full items-center justify-center">
                  <FileIcon className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
              <div className="truncate px-2 py-1.5 text-[11px] text-muted-foreground">
                {e.nombre}
              </div>
              <button
                onClick={() => a(t)}
                className="absolute right-1 top-1 rounded-md bg-background/80 p-1 text-muted-foreground opacity-0 transition-opacity hover:text-fucsia group-hover:opacity-100"
              >
                <Trash2Icon className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
