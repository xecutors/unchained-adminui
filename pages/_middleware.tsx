import { NextResponse, NextRequest } from 'next/server';

const UnrestrictedPages = [
  '/log-in',
  '/sign-up',
  '/account/forgot-password',
  '/reset-password',
  '/api/graphql',
  '/404',
  '/',
];
const middleware = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;

  if (
    !UnrestrictedPages.includes(pathname) &&
    !pathname.match(/^\/sync-reports/) &&
    !parseInt(process.env.NEXT_PUBLIC_SHOW_CONTROL_PANEL, 10)
  ) {
    return NextResponse.rewrite(`/404`);
  }

  if (
    pathname === '/' &&
    !parseInt(process.env.NEXT_PUBLIC_SHOW_CONTROL_PANEL, 10)
  ) {
    return NextResponse.rewrite(`/sync-reports`);
  }

  return NextResponse.next();
};
export default middleware;
