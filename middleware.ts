import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Allow login and register endpoints without token check
  if (["/api/login", "/api/register"].some((path) => request.url.includes(path))) {
    console.log("Allowing access to login/register");
    return response;
  }

  // Get the token from cookies
  const userToken = request.cookies.get("token");

  if (!userToken) {
    console.log("Token not found, redirecting to login page");
    return NextResponse.redirect(new URL("/login", request.url)); // Redirect to login page
  }

  try {
    // Ensure the SECRET_KEY is defined and correctly encoded
    const secretKey = process.env.SECRET_KEY ? new TextEncoder().encode(process.env.SECRET_KEY) : null;

    if (!secretKey) {
      console.error("SECRET_KEY is not defined in the environment variables");
      return NextResponse.json({ error: "Server configuration error", details: "SECRET_KEY is missing" }, { status: 500 });
    }

    // Verify the JWT token
    const { payload } = await jwtVerify(userToken.value, secretKey);

    console.log("Token valid, payload:", payload);

    // Set user data in headers
    response.headers.set("x-user", JSON.stringify(payload));

    return response;
  } catch (error) {
    console.error("Invalid token:", error);
    return NextResponse.json({ error: "Invalid token", details: error.message }, { status: 401 });
  }
}

export const config = {
  matcher: ["/v1/:path*"],
};
