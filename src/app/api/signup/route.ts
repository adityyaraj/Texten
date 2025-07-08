import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
    try {
        const { name, username, email, password, confirmPassword } = await request.json();

        if (!name || !username || !email || !password || !confirmPassword) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }
        
        if (password !== confirmPassword) {
            return NextResponse.json({ message: "Passwords do not match" }, { status: 400 });
        }
        
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }]
            }
        });
        
        if (existingUser) {
            return NextResponse.json({ message: "User already exists with this email or username" }, { status: 400 });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await prisma.user.create({
            data: {
                name,
                username,
                email,
                password: hashedPassword,
            }
        });
        
        return NextResponse.json({ 
            message: "User created successfully", 
            user: { name: user.name, username: user.username, email: user.email } 
        }, { status: 201 });
        
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}