import { NextResponse, NextRequest } from 'next/server';
/* import { UnrestrictedPages } from './app-permissions.config'; */

const isReportUI = false;
const UnrestrictedPages = [
  '/log-in',
  '/sign-up',
  '/oauth',
  '/account/forgot-password',
  '/reset-password',
  '/api/graphql',
  '/404',
  '/423',
  '/_offline',
  '/verify-email',
  "/403"
];
const middleware = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;

  if (
    !UnrestrictedPages.includes(pathname) &&
    !pathname.match(/^\/reports/) &&
    isReportUI &&
    pathname !== '/'
  ) {
    return NextResponse.rewrite(`/404`);
  }
  // temporary until report has a general landing page
  if ((pathname === '/' || pathname === '/reports') && isReportUI) {
    return NextResponse.rewrite(`/reports/daily-sync`);
  }

  return NextResponse.next();
};
export default middleware;
