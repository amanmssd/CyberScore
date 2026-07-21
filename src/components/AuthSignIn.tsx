import { useState } from "react";

import { useAuth } from "../context/useAuth";

type AuthProviderName = "google" | "microsoft";

const providerLabels: Record<AuthProviderName, string> = {
  google: "Google",
  microsoft: "Microsoft",
};

function getErrorMessage(provider: AuthProviderName, error: unknown) {
  const providerLabel = providerLabels[provider];
  let message = "An unexpected OAuth error occurred.";
  let code: string | null = null;
  let status: number | null = null;

  if (error instanceof Error && error.message.trim()) {
    message = error.message.trim();
  }

  if (typeof error === "object" && error !== null) {
    const errorDetails = error as Record<string, unknown>;

    if (typeof errorDetails.code === "string") {
      code = errorDetails.code;
    }

    if (typeof errorDetails.status === "number") {
      status = errorDetails.status;
    }
  }

  const details = [
    code ? `code: ${code}` : null,
    status ? `status: ${status}` : null,
  ].filter((detail): detail is string => detail !== null);

  return `${providerLabel} sign-in could not start: ${message}${
    details.length > 0 ? ` (${details.join(", ")})` : ""
  }`;
}

function AuthSignIn() {
  const { loading, signInWithGoogle, signInWithMicrosoft } = useAuth();
  const [pendingProvider, setPendingProvider] =
    useState<AuthProviderName | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSignIn(provider: AuthProviderName) {
    if (import.meta.env.DEV) {
      console.info("[CyberScore OAuth] Sign-in click", {
        clickHandlerRan: true,
        provider,
        redirectOrigin: window.location.origin,
      });
    }

    setPendingProvider(provider);
    setErrorMessage(null);

    try {
      if (provider === "google") {
        await signInWithGoogle();
      } else {
        await signInWithMicrosoft();
      }
    } catch (error: unknown) {
      setErrorMessage(getErrorMessage(provider, error));
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
