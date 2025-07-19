import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const exclude = searchParams.get("exclude");

  const users = await prisma.user.findMany({
    where: {
      username: exclude ? { not: exclude } : undefined,
    },
    select: {
      id: true,
      username: true,
      name: true,
      profileImage: true,
    },
    take: 10,
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(users);
}