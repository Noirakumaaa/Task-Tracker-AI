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
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);
    const { payload } = await jwtVerify(userToken.value, secretKey);

    console.log("Token valid, payload:", payload);
    console.log("Key :", secretKey);

    response.headers.set("x-user", JSON.stringify(payload));

    return response;
  } catch (error) {
    console.error("Invalid token", error);
    return NextResponse.json({ error: "Invalid token", details: error }, { status: 401 });
  }
}

export const config = {
  matcher: ["/v1/:path*"],
};
