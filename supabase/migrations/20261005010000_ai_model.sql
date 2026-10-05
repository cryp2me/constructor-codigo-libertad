-- La IA pasa a OpenRouter: el usuario elige modelo, no proveedor.
alter table public.user_settings add column if not exists ai_model text;
comment on column public.user_settings.ai_provider is 'Obsoleto: sustituido por ai_model (OpenRouter).';
