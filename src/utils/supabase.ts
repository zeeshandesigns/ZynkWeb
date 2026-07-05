import { createClient } from "@supabase/supabase-js";
// @ts-ignore – virtual module provided by Figma Make
import { projectId, publicAnonKey } from "/utils/supabase/info";

export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey,
);

export const API = `https://${projectId}.supabase.co/functions/v1/make-server-e1000fad`;

export function authHeaders(token: string) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}
