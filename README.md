This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Change graphql endpoint
By default admin UI is pointed to `http://localhost:4010/graphql` set `GRAPHQL_ENDPOINT` to a different value if you want to change it.

## Change logo
Set company logo by using  `NEXT_PUBLIC_LOGO` to provide url of the logo

## Enable Sandbox mode
Set `NEXT_PUBLIC_ALLOW_ENDPOINT_SWITCH` to a truthy value to run admin UI in a sandbox mode


## Adding Additional language support

It is possible to convert to any other language or additional support through env. 
steps:

- provide a `JSON` translation file that uses the exact keys used for localization by setting each translation file path to be used though `UNCHAINED_ADMINUI_TRANSLATIONS` separated with **,**. look into `i18n/en.json` file to see available keys
- each translation file name should follow the convention [locale].json where locale is the language `ISO` code.