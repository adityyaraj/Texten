import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session?.user?.email){
        return NextResponse.json({error:"Unauthorized"}, { status: 401 });
    }
    const formData = await req.formData();
    const title = formData.get("title")?.toString();
    const content = formData.get("content")?.toString();
    const imageUrl = formData.get("imageUrl")?.toString();
    if (!title || !imageUrl) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
        where:{ email: session.user.email }
    })
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