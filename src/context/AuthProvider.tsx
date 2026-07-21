import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";

import {
  supabase,
  supabaseConfigurationError,
} from "../lib/supabase";
import {
  AuthContext,
  type AuthContextValue,
} from "./auth-context";

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(supabase !== null);
  const [authError, setAuthError] = useState<string | null>(
    supabaseConfigurationError,
  );

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    const authClient = supabase;

    let isMounted = true;

    async function initializeAuth() {
      try {
        const {
          data: { session: currentSession },
          error,
        } = await authClient.auth.getSession();

        if (error) {
          throw error;
        }

        if (isMounted) {
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          setAuthError(null);
        }
      } catch (error: unknown) {
        if (isMounted) {
          setAuthError(
            error instanceof Error
              ? error.message
              : "Unable to initialize authentication.",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    void initializeAuth();

    const {
      data: { subscription },
    } = authClient.auth.onAuthStateChange((_event, nextSession) => {
      if (!isMounted) {
        return;
      }

      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      setAuthError(null);
      setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function signInWithGoogle() {
    if (!supabase) {
      throw new Error("CyberScore authentication is not configured.");
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      throw error;
    }
  }

  async function signInWithMicrosoft() {
    if (!supabase) {
      throw new Error("CyberScore authentication is not configured.");
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "azure",
      options: {
        redirectTo: window.location.origin,
        scopes: "email",
      },
    });

    if (error) {
      throw error;
    }
  }

  async function signOut() {
    if (!supabase) {
      throw new Error("CyberScore authentication is not configured.");
    }

    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user,
      loading,
      signInWithGoogle,
      signInWithMicrosoft,
      signOut,
    }),
    [loading, session, user],
  );

  if (loading) {
    return (
      <main className="auth-startup-screen" role="status" aria-live="polite">
        <p>Loading CyberScore…</p>
      </main>
    );
  }

  if (authError) {
    return (
      <main className="auth-startup-screen" role="alert">
        <div>
          <h1>CyberScore couldn’t start</h1>
          <p>{authError}</p>
        </div>
      </main>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
