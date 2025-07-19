import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const authorId = searchParams.get('authorId');

        let posts;
        if (authorId) {
            // Fetch posts by specific author
            posts = await prisma.post.findMany({
                where: {
                    authorId: authorId
                },
                orderBy: {
                    createdAt: "desc"
                }
            });
        } else {
            // Fetch all posts
            posts = await prisma.post.findMany({
                orderBy: {
                    createdAt: "desc"
                }
            });
        }

        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session?.user?.email){
        return NextResponse.json({error:"Unauthorized"}, { status: 401 });
    }

    const body = await req.json();
    const { title, content, imageUrl } = body;

    if (!title || !imageUrl) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
        where:{ email: session.user.email }
    });

    if(!user){
        return NextResponse.json({error:"User not found"}, {status: 404});
    }

    const post = await prisma.post.create({
        data:{
            title,
            content,
            imageUrl,
            published: true,
            authorId: user.id
        },
    });

    return NextResponse.json(post, {status:201});
}