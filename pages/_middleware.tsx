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

const isSyncUI = parseInt(process.env.NEXT_PUBLIC_SHOW_CONTROL_PANEL, 10);
const middleware = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;

  if (
    !UnrestrictedPages.includes(pathname) &&
    !pathname.match(/^\/sync-reports/) &&
    !isSyncUI
  ) {
    return NextResponse.rewrite(`/404`);
  }

  if (pathname === '/' && !isSyncUI) {
    return NextResponse.rewrite(`/sync-reports`);
  }

  return NextResponse.next();
};
export default middleware;
