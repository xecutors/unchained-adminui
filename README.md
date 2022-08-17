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

## Supply PWA manifest
By default admin Ui is PWA enabled and it uses manifest file that uses unchained details (image, name, description, etc...). if you want to provided your own pwa manifest file use `UNCHAINED_PWA_MANIFEST_FILE` to provide the location the custom manifest file.
in addition you can set `metaLinks` to provide meta link information such as device specific image
```
{
"rel":"apple-touch-startup-image",
"href":"/icons/apple-splash-640-1136.jpg",
"media":"(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
},
```
 and `meta` objects  key value pair of meta data for the admin panel

 ```
 meta: {
        "og:description": "Unchained e-commerce shop controller",
        "og:site_name": "Admin UI",
        "og:url": "https://unchained.shop",
        "og:image": "/icons/manifest-icon-512.maskable.png",
        "og:type": "website",
        "og:title": "Unchained Admin UI",
    }
 ```
## Change logo
Set company logo by using  `NEXT_PUBLIC_LOGO` to provide url of the logo

## Enable Sandbox mode
Set `NEXT_PUBLIC_ALLOW_ENDPOINT_SWITCH` to a truthy value to run admin UI in a sandbox mode


## Adding Additional language support

It is possible to convert to any other language or additional support through env. 
steps:

- provide a `JSON` translation file that uses the exact keys used for localization by setting each translation file path to be used though `UNCHAINED_ADMINUI_TRANSLATIONS` separated with **,**. look into `i18n/en.json` file to see available keys
- each translation file name should follow the convention [locale].json where locale is the language `ISO` code.