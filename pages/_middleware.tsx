import { NextResponse, NextRequest } from 'next/server';

const UnrestrictedPages = [
  '/log-in',
  '/sign-up',
  '/forgot-password',
  '/api/graphql',
  '/sync-reports',
  '/',
];
const middleware = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;

  if (
    !UnrestrictedPages.includes(pathname) &&
    !parseInt(process.env.NEXT_PUBLIC_SHOW_CONTROL_PANEL, 10)
  ) {
    return NextResponse.rewrite(`/404`);
  }
  return NextResponse.next();
};
export default middleware;
