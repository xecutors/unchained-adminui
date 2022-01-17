import { NextResponse, NextRequest } from 'next/server';

const UnrestrictedPages = ['/log-in', '/sign-up', '/forgot-password'];

const middleware = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;

  const { token } = req.cookies;
  if (!token && !UnrestrictedPages.includes(pathname)) {
    return NextResponse.redirect(`/log-in?next=${pathname || '/'}`);
  }
  if (token && UnrestrictedPages.includes(pathname))
    return NextResponse.redirect('/');
  return NextResponse.next();
};
export default middleware;
