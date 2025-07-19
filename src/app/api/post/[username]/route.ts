import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: Request, 
  { params }: { params: Promise<{ username: string }> }
) {
  // Await the params promise in Next.js 15
  const { username } = await params;
  
  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 });
  }

  // Find posts by author username (case insensitive)
  const posts = await prisma.post.findMany({
    where: {
      author: {
        username: { equals: username, mode: "insensitive" }
      }
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      imageUrl: true,
      content: true,
      createdAt: true,
      author: {
        select: { username: true }
      }
    }
  });

  return NextResponse.json(posts);
}