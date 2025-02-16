import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_PROJECT_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_API_KEY

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

