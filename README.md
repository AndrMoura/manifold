# Manifold Markets

This [monorepo][] has basically everything involved in running and operating Manifold.

## Install Packages (NEW)

- Install gcloud: https://cloud.google.com/sdk/docs/install
- NodeJS: `$ curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -`
- Yarn: `$ curl -o- -L https://yarnpkg.com/install.sh | bash`
- Java: `$ sudo apt install openjdk-17-jre-headless`
- Check installs: `$ node -v && yarn -v && java --version`

### Firebase

- Create firebase project: https://console.firebase.google.com/. Create an web app too and grab it's configuration and change it at `$ ./common/envs/dev.ts`
- Create a private key from firebase project settings: Service Account tab > Firebase SDK admin and download the `.json`.
- `$ \functions\src\scripts\script-init.ts` and change keyPath var pointing to your own .json file

0. `$ cd functions` to switch to this folder
1. `$ yarn global add firebase-tools` to install the Firebase CLI globally
2. `$ yarn` to install JS dependencies
3. `$ firebase login` to authenticate the CLI tools to Firebase
4. `$ firebase use project_id` to choose the dev project.
5. `$ gcloud auth login` to authenticate the CLI tools to Google Cloud
6. `$ gcloud config set project <project-id>` to choose the project (`$ gcloud projects list` to see options)
7. `$ cd .. && cd web && yarn`
8. Go to projects root and run : `./dev.sh localdb`

## Getting started

0. Make sure you have [Yarn 1.x][yarn]
1. `$ cd web`
2. `$ yarn`
3. `$ yarn dev:dev`
4. Your site will be available on http://localhost:3000

See [`web/README.md`][web-readme] for more details on hacking on the web client.

## General architecture

Manifold's public API and web app are hosted by [Vercel][vercel]. In general, the web app runs as much as possible on the client; we follow a [JAMStack][jamstack] architecture. All data is stored in Firebase's database, [Cloud Firestore][cloud-firestore]. This is directly accessed by the client for most data access operations.

Operations with complicated contracts (e.g. buying shares) are provided in a separate HTTP API using Firebase's [Cloud Functions][cloud-functions]. Those are deployed separately from the Vercel website; see [`functions/README.md`][functions-readme] for more details.

## Directory overview

- `web/`: UI and business logic for the client. Where most of the site lives. The public API endpoints are also in here.

- `functions/`: Firebase cloud functions, for secure work (e.g. balances, Stripe payments, emails). Also contains in
  `functions/src/scripts/` some Typescript scripts that do ad hoc CLI interaction with Firebase.

- `common/`: Typescript library code shared between `web/` & `functions/`. If you want to look at how the market math
  works, most of that's in here (it gets called from the `placeBet` and `sellBet` endpoints in `functions/`.) Also
  contains in `common/envs` configuration for the different environments (i.e. prod, dev, Manifold for Teams instances.)

- `og-image/`: The OpenGraph image generator; creates the preview images shown on Twitter/social media.

- `docs/`: Manifold's public documentation that lives at https://docs.manifold.markets.

## Contributing

Since we are just now open-sourcing things, we will see how things go. Feel free to open issues, submit PRs, and chat about the process on [Discord][discord]. We would prefer [small PRs][small-prs] that we can effectively evaluate and review -- maybe check in with us first if you are thinking to work on a big change.

By contributing to this codebase, you are agreeing to the terms of the [Manifold CLA](https://github.com/manifoldmarkets/manifold/blob/main/.github/CONTRIBUTING.md).

If you need additional access to any infrastructure in order to work on something (e.g. Vercel, Firebase) let us know about that on [Discord][discord] as well.

[vercel]: https://vercel.com/
[jamstack]: https://jamstack.org/
[monorepo]: https://semaphoreci.com/blog/what-is-monorepo
[yarn]: https://classic.yarnpkg.com/lang/en/docs/install/
[web-readme]: https://github.com/manifoldmarkets/manifold/blob/main/web/README.md
[functions-readme]: https://github.com/manifoldmarkets/manifold/blob/main/functions/README.md
[cloud-firestore]: https://firebase.google.com/docs/firestore
[cloud-functions]: https://firebase.google.com/docs/functions
[small-prs]: https://google.github.io/eng-practices/review/developer/small-cls.html
[discord]: https://discord.gg/3Zuth9792G
