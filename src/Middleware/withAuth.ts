import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

type ProtectedRoute = {
  path: string;
  roles: Array<"member" | "editor" | "admin">;
};

const protectedRoutes: ProtectedRoute[] = [
  { path: "/profile", roles: ["member", "editor", "admin"] },
  { path: "/editor", roles: ["editor", "admin"] },
  { path: "/admin", roles: ["admin"] },
];

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = [],
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;
    const matchedRoute = protectedRoutes.find(
      (route) =>
        requireAuth.includes(route.path) &&
        (pathname === route.path || pathname.startsWith(`${route.path}/`)),
    );

    if (matchedRoute) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });

      if (!token) {
        const loginUrl = new URL("/auth/login", req.url);
        loginUrl.searchParams.set(
          "callbackUrl",
          `${req.nextUrl.pathname}${req.nextUrl.search}`,
        );
        return NextResponse.redirect(loginUrl);
      }

      if (!matchedRoute.roles.includes(token.role as any)) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
    return middleware(req, next);
  };
}