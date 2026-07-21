import { useState } from "react";

import { useAuth } from "../context/useAuth";

function getErrorMessage(error: unknown) {
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

  return `Google sign-in could not start: ${message}${
    details.length > 0 ? ` (${details.join(", ")})` : ""
  }`;
}

function AuthSignIn() {
  const { loading, signInWithGoogle } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSignIn() {
    if (import.meta.env.DEV) {
      console.info("[CyberScore OAuth] Sign-in click", {
        clickHandlerRan: true,
        provider: "google",
        redirectOrigin: window.location.origin,
      });
    }

    setIsSigningIn(true);
    setErrorMessage(null);

    try {
      await signInWithGoogle();
    } catch (error: unknown) {
      setErrorMessage(getErrorMessage(error));
      setIsSigningIn(false);
    }
  }

  const isDisabled = loading || isSigningIn;

  return (
    <section className="auth-sign-in" aria-labelledby="auth-sign-in-title">
      <h3 id="auth-sign-in-title">Save your progress</h3>
      <p>
        Sign in to prepare your account. Assessment saving will be added next.
      </p>

      <div className="auth-sign-in-actions">
        <button
          type="button"
          onClick={() => void handleSignIn()}
          disabled={isDisabled}
        >
          {isSigningIn ? "Opening Google…" : "Continue with Google"}
        </button>

        <button type="button" disabled aria-disabled="true">
          Continue with Microsoft — Coming soon
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
