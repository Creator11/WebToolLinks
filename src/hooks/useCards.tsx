import { useQuery } from "@tanstack/react-query";
import {supabase} from "../services/supabase/supabase.ts";

export function useCards() {
    return useQuery({
        queryKey: ["cards"],
        queryFn: async () => {
            const { data, error } = await supabase.from("cards").select("*");
            if (error) throw new Error(error.message);
            return data;
        },
        staleTime: 1000 * 60 * 60, // 1 час
    });
}