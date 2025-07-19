import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request, { params }: { params: { username: string } }) {
  const username = params.username;
  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 });
  }
  // Find user by username (case insensitive)
  const user = await prisma.user.findFirst({
    where: {
      username: { equals: username, mode: "insensitive" }
    },
    select: {
      id: true,
      name: true,
      username: true,
      profileImage: true,
      // Don't expose email or password
    }
  });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json(user);
}
