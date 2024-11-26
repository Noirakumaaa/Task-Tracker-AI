import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prismaClient";


export async function GET(request : NextRequest){
    const users = await prisma.accounts.findMany()
    return NextResponse.json({Users : users})
}
