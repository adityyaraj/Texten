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

        if (password.length < 6) {
            return NextResponse.json({ message: "Password must be at least 6 characters" }, { status: 400 });
        }

        // Username validation - only allow alphanumeric and underscores
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        if (!usernameRegex.test(username)) {
            return NextResponse.json({ message: "Username can only contain letters, numbers, and underscores" }, { status: 400 });
        }

        if (username.length < 3 || username.length > 20) {
            return NextResponse.json({ message: "Username must be between 3 and 20 characters" }, { status: 400 });
        }

        // Reserved usernames
        const reservedUsernames = [
            'api', 'home', 'admin', 'auth', 'front', 'web', 'log', 'signup', 'login',
            'profile', 'settings', 'help', 'about', 'contact', 'privacy', 'terms'
        ];

        if (reservedUsernames.includes(username.toLowerCase())) {
            return NextResponse.json({ message: "This username is not available" }, { status: 400 });
        }
        
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { username: username.toLowerCase() }]
            }
        });
        
        if (existingUser) {
            if (existingUser.email === email) {
                return NextResponse.json({ message: "User with this email already exists" }, { status: 400 });
            }
            if (existingUser.username === username.toLowerCase()) {
                return NextResponse.json({ message: "Username is already taken" }, { status: 400 });
            }
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await prisma.user.create({
            data: {
                name,
                username: username.toLowerCase(),
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