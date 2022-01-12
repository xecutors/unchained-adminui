import { NextResponse, NextRequest } from 'next/server';

const middleware = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;

  const { token } = req.cookies;
  if (!token && pathname !== '/log-in') {
    return NextResponse.redirect(`/log-in?next=${pathname || '/'}`);
  }
  if (token && pathname === '/log-in') return NextResponse.redirect('/');
  return NextResponse.next();
};
export default middleware;
