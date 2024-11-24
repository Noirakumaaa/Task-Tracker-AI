import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (["/api/login", "/api/register"].some((path) => request.url.includes(path))) {
    console.log("Allowing access to login/register");
    return response;
  }

  const userToken = request.cookies.get("token");

  if (!userToken) {
    console.log("Token not found, redirecting to login page");
    return NextResponse.redirect(new URL("/u/login", request.url));
  }

  const secretKey = process.env.SECRET_KEY;

  if (!secretKey) {
    console.error("SECRET_KEY is not defined");
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }

  try {
    // Use TextEncoder to encode the secret key
    const encoder = new TextEncoder();
    const key = encoder.encode(secretKey);

    // Verify the JWT token
    const { payload } = await jwtVerify(userToken.value, key);

    console.log("Token valid, payload:", payload);

    // Set user data in headers
    response.headers.set("x-user", JSON.stringify(payload));

    return response;
  } catch (error) {
    console.error("Invalid token:", error);
    return NextResponse.json({ error: "Invalid token", details: error }, { status: 401 });
  }
}

export const config = {
  matcher: ["/v1/:path*"],
};
