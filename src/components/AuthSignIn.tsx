import { useState } from "react";

import { useAuth } from "../context/useAuth";

type AuthProviderName = "google" | "microsoft";

function getErrorMessage(error: unknown) {
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return "We couldn't start sign-in. Please try again.";
}

function AuthSignIn() {
  const { loading, signInWithGoogle, signInWithMicrosoft } = useAuth();
  const [pendingProvider, setPendingProvider] =
    useState<AuthProviderName | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSignIn(provider: AuthProviderName) {
    setPendingProvider(provider);
    setErrorMessage(null);

    try {
      if (provider === "google") {
        await signInWithGoogle();
      } else {
        await signInWithMicrosoft();
      }
    } catch (error: unknown) {
      setErrorMessage(getErrorMessage(error));
      setPendingProvider(null);
    }
  }

  const isDisabled = loading || pendingProvider !== null;

  return (
    <section className="auth-sign-in" aria-labelledby="auth-sign-in-title">
      <h3 id="auth-sign-in-title">Save your progress</h3>
      <p>
        Sign in to prepare your account. Assessment saving will be added next.
      </p>

      <div className="auth-sign-in-actions">
        <button
          type="button"
          onClick={() => void handleSignIn("google")}
          disabled={isDisabled}
        >
          {pendingProvider === "google"
            ? "Opening Google…"
            : "Continue with Google"}
        </button>

        <button
          type="button"
          onClick={() => void handleSignIn("microsoft")}
          disabled={isDisabled}
        >
          {pendingProvider === "microsoft"
            ? "Opening Microsoft…"
            : "Continue with Microsoft"}
        </button>
      </div>

      {errorMessage && (
        <p className="auth-error" role="alert">
          {errorMessage}
        </p>
      )}
    </section>
  );
}

export default AuthSignIn;
