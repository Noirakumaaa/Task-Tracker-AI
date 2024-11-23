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


export async function POST(request: NextRequest) {
    try {
      const body: BodyData = await request.json();
      console.table(body);
  
      const res = await prisma.task.create({
        data: {
          name: body.name,
          description: body.description,
          user_id: body.user_id,
          status: body.status,
          start_date: body.start_date,
          deadline: body.deadline,
        },
      });
  
      return NextResponse.json({ success: true, data: res });
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Failed to create task", error: error },
        { status: 500 }
      );
    } finally {
      await prisma.$disconnect();
    }
  }
  