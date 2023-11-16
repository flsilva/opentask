# Welcome to OpenTask

To report bugs, please [open an issue](https://github.com/flsilva/opentask/issues).

To share ideas with the community, ask questions, and new features, please [start a discussion](https://github.com/flsilva/opentask/discussions).

## How to run OpenTask locally

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

It uses [Supabase](https://supabase.com/) as the backend service, which is built on top of Postgres.

You need Node.js v20.3.1+ to run OpenTask locally.

### How to set up your local machine

These instructions should be followed only once:

1. Clone this repo.
2. Install dependencies: `npm install`.
3. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/).
4. Make a copy of `.env.example` file and name it `.env`.
   You won't need to change this file as it already contains the localhost database URL.
   You can change it if you want to set up authentication with OAuth.
5. Make a copy of `.env.local.example` file and name it `.env.local`.
   You'll make a change to this file after you start Supabase (see next).

## How to run the app locally

These instructions should be followed every time you want to run the app locally:

1. Open Docker Desktop.
2. [Start Supabase](https://supabase.com/docs/reference/cli/supabase-start): `npx supabase start -x realtime,storage-api,imgproxy`. That will exclude unused Supabase services to save on RAM. If you forget to open Docker Desktop you'll get an error message starting with `Cannot connect to the Docker daemon`.
3. You'll get some URLs and `anon key`. Copy the value of `anon key` and past it in your `.env.local` file as the value of the `NEXT_PUBLIC_SUPABASE_ANON_KEY` variable. You only have to do this once.
4. Run [Prisma migrations](https://www.prisma.io/docs/reference/api-reference/command-reference#migrate-dev): `npx prisma migrate dev`.
5. Run Next.js local development server: `npm run dev`.
6. Open [http://localhost:3000](http://localhost:3000) with your browser to use the app.

## How to sign in locally

It's easier to sign in with an email on localhost, as there's no need to set up OAuth apps.

Email sign in is enabled on localhost only, there's no such option on production.

You can use a fake email like `test@test.com`. See how next.

1. Visit the Sign In page, enter an email and hit continue. You should be redirected to `http://localhost:3000/auth/sign-in/check-email-link`.
2. Open [http://localhost:54324/monitor](http://localhost:54324/monitor) in a new browser tab. That's [Inbucket](https://inbucket.org/), an email testing app running locally alongside Supabase.
3. You should see an email with the subject `Confirm Your Email`. Open it, then click on the link `Confirm your email address`.
4. You should be redirected to a URL that starts with `http://localhost/auth/v1/verify`. It used to work correctly, but after some tests it stopped adding the necessary port number to the URL. So go ahead and manually add `:54321` to the URL so that it starts with `http://localhost:54321/auth/v1/verify` instead (keep the rest of URL as is). We should fix this issue, but for now this extra step will make it.
5. Hit enter and you should be logged in and redirected to `http://localhost:3000/app/today`.
6. You can now test the app locally. Enjoy!

That email confirmation link expires pretty quickly, so if you take a while to click it you might be redirected back to the Sign In page with the following URL:

`http://localhost:3000/auth/sign-in#error=invalid_request&error_code=400&error_description=No+associated+flow+state+found.+400%253A+Flow+state+is+expired`.

If that happens, just try again. If you can't sign in, please [open a issue](https://github.com/flsilva/opentask/issues).

We should also improve the UX by adding a message telling the user that an error happened and they should try again.

## How to stop running the app locally

1. Stop Supabase: `npx supabase stop`. If you want to clear all database data, run this instead: `npx supabase stop --no-backup`.
2. Close Docker Desktop.
3. Stop the Next.js development server.

If you find any problems with the instructions above, please [open an issue](https://github.com/flsilva/opentask/issues).
