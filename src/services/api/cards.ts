import { supabase } from "../supabase/supabase.ts";

export async function getCards() {
    const { data, error } = await supabase.from("cards").select("*");
    if (error) throw error;
    return data;
}