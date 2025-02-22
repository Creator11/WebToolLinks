import { supabase } from "../supabase/supabase.ts";

export const getUserBookmarks = async (userId: string) => {
    const { data, error } = await supabase
        .from("profile")  // Таблица называется profile
        .select("card_id") // Получаем только массив card_id
        .eq("user_id", userId)  // Фильтруем по user_id
        .maybeSingle();  // Используем maybeSingle, чтобы избежать ошибки на пустой результат
    console.log("getUserBookmarks",data);
    if (error) {
        console.error("Ошибка загрузки bookmarks:", error);
        return [];
    }

    return data?.card_id || [];  // Возвращаем массив card_id или пустой массив

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