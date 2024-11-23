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

export async function PUT(request: NextRequest) {
    try {
      const { data, status }: { data: BodyData[], status: string } = await request.json();
      console.log(data, status, "API")
      if (!Array.isArray(data) || data.length === 0) {
        return NextResponse.json(
          {
            success: false,
            message: "Request body must be a non-empty array of tasks",
          },
          { status: 400 }
        );
      }
  
      const updatedTasks = await Promise.all(
        data.map(async (task) => {
          if (!task.id) {
            throw new Error("Each task must include an ID for updating");
          }
          return prisma.task.update({
            where: { id: task.id },
            data: {
              name: task.name,
              description: task.description,
              user_id: task.user_id,
              status: status, // Use passed status or existing status if not provided
              start_date: task.start_date,
              deadline: task.deadline,
            },
          });
        })
      );
  
      return NextResponse.json({ success: true, data: updatedTasks });
    } catch (error: any) {
      console.error("Failed to update tasks:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to update tasks",
          error: error.message,
        },
        { status: 500 }
      );
    } finally {
      await prisma.$disconnect();
    }
  }
  