export { default } from "next-auth/middleware";

/* handling the authentication logic for the specified routes */
export const config = {
  matcher: [
    "/upload/:path*",
    "/profile/:path*/private",
    "/profile/:path*/favorite",
    "/profile/private/:path*",
  ],
};
