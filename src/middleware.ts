import { NextResponse } from "next/server";
import withAuth from "./Middleware/withAuth";

const middleware = withAuth(() => NextResponse.next(), ["/profile", "/editor", "/admin"]);

export const config = {
	matcher: ["/profile/:path*", "/editor/:path*", "/admin/:path*"],
};

export default middleware;