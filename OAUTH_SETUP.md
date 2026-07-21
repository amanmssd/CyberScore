# CyberScore Google OAuth Setup

This checklist configures Google sign-in for the hosted CyberScore Supabase project.

Safe project values used below:

- Local application origin: `http://localhost:5173`
- Supabase project URL: `https://iawanbmgzfojqvhkbuvh.supabase.co`
- Supabase callback URL: `https://iawanbmgzfojqvhkbuvh.supabase.co/auth/v1/callback`

Do not place a Google Client Secret, Supabase secret key, or legacy `service_role` key in React code, a Vite environment variable, or Git.

## Google Cloud configuration

1. Open the Google Cloud Console and create a project or select the project that will own CyberScore authentication.
2. Open Google Auth Platform and configure the OAuth consent screen:
   - Add the application name and support contact information.
   - Choose the appropriate audience for the application.
   - Add only the basic `openid`, email, and profile scopes required for authentication.
3. If the consent screen is in testing mode, add the Google account used for development under **Test users**. Accounts not listed as test users may be blocked.
4. Open **Clients** or **APIs & Services → Credentials**.
5. Create an **OAuth Client ID** with application type **Web application**.
6. Under **Authorized JavaScript origins**, enter exactly:

   ```text
   http://localhost:5173
   ```

7. Under **Authorized redirect URIs**, enter exactly:

   ```text
   https://iawanbmgzfojqvhkbuvh.supabase.co/auth/v1/callback
   ```

The Supabase callback URL—not localhost—belongs in Google’s **Authorized redirect URIs**. Google returns to Supabase first; Supabase then redirects the browser to CyberScore.

For a future production deployment, also add the exact production origin under **Authorized JavaScript origins**:

```text
https://YOUR-PRODUCTION-DOMAIN
```

The Google Authorized redirect URI remains the same hosted Supabase callback URL unless the Supabase project changes.

## Supabase Google provider configuration

1. Open the CyberScore project in the Supabase Dashboard.
2. Navigate to **Authentication → Sign In / Providers → Google**.
3. Enable the Google provider.
4. Paste the Google OAuth Client ID from Google Cloud.
5. Paste the Google OAuth Client Secret from Google Cloud.
6. Save the provider settings.

The Google Client Secret belongs only in the Supabase provider configuration. Never place it in React code, `.env.local`, `.env.example`, browser-visible Vite variables, or GitHub.

## Supabase URL configuration

1. In the Supabase Dashboard, navigate to **Authentication → URL Configuration**.
2. For local development, set **Site URL** to exactly:

   ```text
   http://localhost:5173
   ```

3. Add both of these entries under **Redirect URLs**:

   ```text
   http://localhost:5173
   http://localhost:5173/**
   ```

The exact origin matches the application’s current `redirectTo: window.location.origin`. The wildcard entry allows local paths if CyberScore later redirects back to a specific route.

When CyberScore is deployed, replace the Site URL with the canonical production origin and add exact production redirect entries:

```text
https://YOUR-PRODUCTION-DOMAIN
https://YOUR-PRODUCTION-DOMAIN/**
```

Use HTTPS and the real deployed hostname. Do not leave `YOUR-PRODUCTION-DOMAIN` as a literal dashboard value.

## Testing checklist

- [ ] Save the Google provider and URL configuration changes.
- [ ] Stop and restart `npm run dev` so Vite reloads local environment variables.
- [ ] Open `http://localhost:5173`.
- [ ] Complete the assessment and click **Save progress**.
- [ ] Click **Continue with Google**.
- [ ] Confirm that Google account selection or consent appears.
- [ ] Confirm that Google redirects through Supabase and returns to CyberScore.
- [ ] Confirm that CyberScore recognizes the signed-in session and shows **Sign out**.
- [ ] Refresh the page and confirm that the signed-in session remains active.
- [ ] Test **Sign out** and confirm the account control returns to **Save progress**.
- [ ] Start sign-in again and cancel it to verify the failure path is understandable.
- [ ] Inspect the browser console for the development-only CyberScore OAuth diagnostic and any provider errors.

## Common errors

### Provider is not enabled

Supabase has not enabled Google for the project. Open **Authentication → Sign In / Providers → Google**, add the correct Client ID and Client Secret, enable Google, and save.

### `redirect_uri_mismatch`

Google does not recognize the callback supplied by Supabase. Confirm that Google’s **Authorized redirect URIs** contains this exact value, including protocol and path and without a typo:

```text
https://iawanbmgzfojqvhkbuvh.supabase.co/auth/v1/callback
```

Do not use `http://localhost:5173` as Google’s Authorized redirect URI for the hosted Supabase flow.

### Access blocked

The Google consent screen may be incomplete, the app may still be in testing mode, or the current Google account may not be an authorized test user. Complete the consent-screen requirements and add the developer account under **Test users**.

### Requested path is invalid

The callback or application redirect may be malformed or missing from an allow-list. Recheck the full Supabase callback in Google Cloud and the local origin entries under Supabase **URL Configuration**.

### Redirect returned to the wrong URL

Supabase may be falling back to its Site URL because the `redirectTo` origin is absent from **Redirect URLs**. Set the local Site URL and add both local redirect entries shown above. In production, use the exact canonical production origin.

### Button click does nothing

Open the browser developer console and look for the development-only `[CyberScore OAuth] Sign-in click` diagnostic. It should report that the handler ran, the `google` provider, and the current redirect origin. If it appears, inspect the Network panel and provider error. If it does not appear, verify that authentication initialization finished and that the button is not disabled. Never paste keys, tokens, sessions, or secrets into debugging output.
