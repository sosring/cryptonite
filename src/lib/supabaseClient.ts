import { createClient } from "@supabase/supabase-js";

const SUPABASE_HOST = import.meta.env.VITE_SUPABASE_HOST;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(SUPABASE_HOST, SUPABASE_KEY);
