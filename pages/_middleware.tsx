import { NextResponse, NextRequest } from 'next/server';
import { UnrestrictedPages } from '../modules/common/data/miscellaneous';

const isReportUI = !parseInt(process.env.NEXT_PUBLIC_SHOW_CONTROL_PANEL, 10);
const middleware = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;

  if (
    !UnrestrictedPages.includes(pathname) &&
    !pathname.match(/^\/reports/) &&
    isReportUI
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
