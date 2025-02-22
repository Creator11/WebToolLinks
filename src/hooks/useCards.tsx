import { useEffect, useState } from "preact/hooks";
import { supabase } from "../services/supabase/supabase.ts";
import { User } from "@supabase/supabase-js"; // Импортируем тип User

export const useUser = () => {
    const [user, setUser] = useState<User | null>(null); // Явно указываем тип
    // console.log("user",user);
    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user ?? null);
        };

        fetchUser();

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    return { user };
};