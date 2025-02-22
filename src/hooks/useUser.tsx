import { useEffect, useState } from "preact/hooks";
import { supabase } from "../services/supabase/supabase.ts";
import { User } from "@supabase/supabase-js";

export const useUser = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await supabase.auth.getUser();
            setUser(data.user ?? null);
            setLoading(false);
        };

        fetchUser();

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => {
            authListener?.subscription?.unsubscribe();
        };
    }, []);

    return { user, loading };
};