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
    if (isBookmarked) {
        // Удаляем из избранного
        const { error } = await supabase
            .from("profile")
            .update({
                card_id: supabase
                    .rpc("array_remove", { arr: "card_id", value: cardId })
            })
            .eq("user_id", userId);

        if (error) {
            console.error("Ошибка при удалении из избранного:", error);
        }
    } else {
        // Добавляем в избранное
        const { error } = await supabase
            .from("profile")
            .update({
                card_id: supabase
                    .rpc("array_append", { arr: "card_id", value: cardId })
            })
            .eq("user_id", userId);

        if (error) {
            console.error("Ошибка при добавлении в избранное:", error);
        }
    }
};