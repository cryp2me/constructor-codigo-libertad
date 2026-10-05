import { createClient } from "@base44/sdk";

export const base44 = createClient({
  appId: import.meta.env.VITE_BASE44_APP_ID || "6abfaf6367b251a57a5130d0",
  serverUrl: import.meta.env.VITE_BASE44_SERVER_URL || "",
  requiresAuth: false,
});
