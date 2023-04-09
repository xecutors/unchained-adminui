import { NextResponse, NextRequest } from 'next/server';

const isReportUI = false;
const middleware = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;
const url = new URL(req.url)
  const apiUrl = `${url.origin}/api/permission-config?json=true`;
  
  const permissionsConfig = await fetch(apiUrl)
  const {UnrestrictedPages} = await permissionsConfig.json()
  
  

  if (
   (UnrestrictedPages && !UnrestrictedPages.includes(pathname))&&
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
