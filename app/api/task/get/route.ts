import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

interface BodyData {
  id: string;
  name: string;
  description: string;
  user_id: string;
  status: string;
  start_date: Date;
  deadline: Date;
}

export async function GET(request: NextRequest) {
  try {
    const res = await prisma.task.findMany();
    return NextResponse.json({ TaskList: res });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch tasks", error: error },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}