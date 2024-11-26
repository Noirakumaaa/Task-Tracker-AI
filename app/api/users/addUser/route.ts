import { NextRequest ,NextResponse} from "next/server";
import { prisma } from "@/prisma/prismaClient";
import bcrypt from 'bcryptjs';



interface BodyData {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  age: number;
  user_type: string
}

export async function POST(request: Request) {
    try{
        const body: BodyData = await request.json();
        const hashedPassword = bcrypt.hashSync(body.password, 10);
        console.table(body)
        const PostUser = await prisma.accounts.create({
          data: {
              firstName: body.firstName,
              lastName: body.lastName,
              userName: body.userName,
              email: body.email,
              password: hashedPassword,
              age: body.age,
              user_type: body.user_type,
          },
        });
        console.log(PostUser)
        return NextResponse.json({Mesage : PostUser})
    }catch (error: any) {
        return NextResponse.json({ Error: error.message, meta: error.meta });
      }
      
 

 
}
