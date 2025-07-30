This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

It's an incomplete sample storefront you can use as a starter for a small Web-Shop.

## Getting Started

Install dependencies:
```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Change graphql endpoint
By default Admin UI tries to connect to `http://localhost:4010/graphql`. set `NEXT_PUBLIC_GRAPHQL_ENDPOINT` to a different value if you want to change it.

To do that only for local development, you can create a .env.local and add the ENV=value there.

## Change logo
Set company logo by using  `NEXT_PUBLIC_LOGO` to provide url of the logo

