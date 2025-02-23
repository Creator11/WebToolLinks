import { supabase } from "../supabase/supabase.ts";

export const getUserBookmarks = async (userId: string) => {
    const { data, error } = await supabase
        .from("profile")
        .select("card_id")
        .eq("user_id", userId)
        .maybeSingle();
    console.log("getUserBookmarks",data);
    if (error) {
        console.error("Ошибка загрузки bookmarks:", error);
        return [];
    }

    return data?.card_id || [];

};

export const toggleBookmark = async (userId: string, cardId: string, isBookmarked: boolean) => {
    let error;

    if (isBookmarked) {
        ({ error } = await supabase.rpc("remove_bookmark", {
            user_id: userId,
            card: cardId
        }));
    } else {
        ({ error } = await supabase.rpc("add_bookmark", {
            user_id: userId,
            card: cardId
        }));
    }

    if (error) {
        console.error("Ошибка при изменении избранного:", error);
    }
};