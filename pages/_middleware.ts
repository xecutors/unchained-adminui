import { NextResponse, NextRequest } from 'next/server';

const middleware = async (req: NextRequest) => {
  if (req.page?.name === '/api/graphql/[[...slug]]') {
    return NextResponse.next();
  }

  return NextResponse.next();
};
export default middleware;
