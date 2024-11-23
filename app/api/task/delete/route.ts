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


export async function DELETE(request: NextRequest) {
    try {
      const body: BodyData[] = await request.json();
  
  
          const ids = body.map((task) => task.id);
  
      const deletedTasks = await prisma.task.deleteMany({
        where: {
          id: { in: ids },
        },
      });
      console.log(deletedTasks, "HELLOOO")
      return NextResponse.json({
        success: true,
        message: `${deletedTasks.count} tasks deleted successfully`,
        data: deletedTasks,
      });
    } catch (error: any) {
      console.log("ERROR : ", error.message)
      return NextResponse.json(
        {
          success: false,
          message: "Failed to delete tasks",
          error: error.message,
        },
        { status: 500 }
      );
    } finally {
      await prisma.$disconnect();
    }
  }
  