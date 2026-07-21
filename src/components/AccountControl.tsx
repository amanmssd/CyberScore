import { useState } from "react";

import { useAuth } from "../context/useAuth";
import AuthSignIn from "./AuthSignIn";

function getErrorMessage(error: unknown) {
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return "We couldn't sign you out. Please try again.";
}

function AccountControl() {
  const { session, loading, signOut } = useAuth();
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSignOut() {
    setIsSigningOut(true);
    setErrorMessage(null);

    try {
      await signOut();
    } catch (error: unknown) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsSigningOut(false);
    }
  }

  if (loading) {
    return (
      <div className="account-control">
        <button className="account-button" type="button" disabled>
          Checking account…
        </button>
      </div>
    );
  }

  if (session) {
    return (
      <div className="account-control">
        <button
          className="account-button"
          type="button"
          onClick={() => void handleSignOut()}
          disabled={isSigningOut}
        >
          {isSigningOut ? "Signing out…" : "Sign out"}
        </button>

        {errorMessage && (
          <p className="auth-error" role="alert">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="account-control">
      <button
        className="account-button"
        type="button"
        onClick={() => setIsSignInOpen((isOpen) => !isOpen)}
        aria-expanded={isSignInOpen}
        aria-controls="results-auth-sign-in"
      >
        Save progress
      </button>

      {isSignInOpen && (
        <div id="results-auth-sign-in">
          <AuthSignIn />
        </div>
      )}
    </div>
  );
}

export default AccountControl;
