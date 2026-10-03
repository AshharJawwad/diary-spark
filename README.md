This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Feedback API setup

The feedback form posts to `POST /api` (`src/app/api/route.js`). Copy
`.env.example` to `.env.local`, configure `MONGODB_URI` with a database name,
and fill in `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`,
`FEEDBACK_FROM`, and `FEEDBACK_TO`. Restart the development server after
changing environment variables. Keep credentials in `.env.local` or your
hosting provider's environment settings.

Use port 465 for implicit TLS or 587 for STARTTLS. The configured sender
must be allowed by your email provider. Notifications go to `FEEDBACK_TO`;
the submitter's email is only the reply-to address.

Submissions are saved in MongoDB's `feedbacks` collection with timestamps
and a notification status (`pending`, `sent`, or `failed`). Database failures
return 503. If notification delivery fails after saving, the API returns
201 and records `failed`; there is no automatic email retry. `sent` means
the SMTP server accepted the notification, not that it reached an inbox.

Run `npm test` for API and form submission regression tests. These tests
use isolated database/email adapters and do not contact external services.

## Clerk authentication setup

The custom `/login` and `/register` pages use Clerk's authentication forms.
Set `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` in `.env.local`
using the keys from the same Clerk application, then restart the server.
Keep the secret key server-side. Without keys, the pages show an unavailable
message and never authenticate a user.

In the Clerk Dashboard, enable email/password registration and email
verification. Configure your deployed application domain before deployment.
Also enable Username and First and last name in Clerk's user model settings.
Enable sign-in with username as well as email. The custom login form has two
fields: Email or Username, and Password. Login creates a strict sign-in attempt
with `signUpIfMissing: false` before checking the password. Clerk's standard UI
handles any additional device verification, MFA, session tasks, or account recovery.
The custom registration form collects Name, Username, Email, Password, and
Confirm Password. Password confirmation is checked locally and is never sent
to Clerk. A single Name field is split into first name and remaining last name.
Registration continues with an email verification code and supports resending
the code. Additional required signup fields (such as phone number or legal
acceptance) must not be enabled unless the form is extended to collect them.
Registration, verification, password recovery, and sessions are handled by
Clerk; passwords are never stored in this application's MongoDB database.

Login explicitly uses `withSignUp: false` and `transferable: false`, so unknown
accounts cannot become new accounts through login, including OAuth transfers.
New users must visit `/register` and complete Clerk's registration requirements.
The home page and feedback API remain public. The navbar shows account controls
after signing in. Successful login or registration redirects home.

Verify with your Clerk instance: an unknown email cannot log in; a verified
registered account can log in; an incorrect password fails; sign-out restores
the login and registration links. Automated tests check the strict login policy;
live authentication requires your Clerk application keys.

The navbar conditionally renders a Login link to `/login` for an account
remembered as registered in this browser tab, or a Register link to `/register`
otherwise. Successful registration or login updates that display hint, which
never grants authentication. New browser tabs cannot identify an existing
logged-out account until authentication. Existing users can also reach Login
from the registration page. The account-entry page and its lookup endpoint
have been removed.

Registration advances to email verification only after successfully sending
a code. Missing signup requirements show an error instead of entering an
unfinishable verification flow. Users can resend codes or change their details;
changing details preserves name, username, and email but clears passwords.

## Next.js resources

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
