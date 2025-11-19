import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createUserSchema } from "@/app/validationSchema";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const validation = createUserSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newUser = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
    },
  });

  return NextResponse.json(newUser, { status: 201 });
}
