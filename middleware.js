/* export { default } from "next-auth/middleware";
 */

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  /* other users are not authorized for private and favorite gallery*/
  function middleware(request) {
    const { pathname } = request.nextUrl;
    const { token } = request.nextauth;

    const myUserId = token?.user?._id;
    const paths = [
      `/profile/${myUserId}/favorite`,
      `/profile/${myUserId}/private`,
    ];

    if (!paths.includes(pathname) && pathname.startsWith("/profile")) {
      return new NextResponse("You are not authorized...");
    }
    console.log(myUserId, pathname);
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      },
    },
  }
);
/* handling the authentication logic for the specified routes */
export const config = {
  matcher: [
    "/upload/:path*",
    "/profile/:path*/private",
    "/profile/:path*/favorite",
    "/profile/private/:path*",
  ],
};
