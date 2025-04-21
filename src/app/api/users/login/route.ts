/*import connectDB from "../../../../../config/mongodb";
import User from "@/models/userSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "devsecretkey";

export async function POST(request: NextRequest) {
    try {
        await connectDB("Users");

        const { email, password } = await request.json();

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

        return NextResponse.json({
            token,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}*/

// src/app/api/users/login/route.ts
import { NextResponse } from "next/server";
import connectDB from "../../../../../config/mongodb";
import userSchema from "../../../../models/userSchema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // JWT package for token generation

export async function POST(request) {
  try {
    const conn = await connectDB("Users");

    const User = conn.models.User || conn.model("User", userSchema);

    const { email, password } = await request.json();

    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 2. Compare the passwords using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    // 3. Create a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET, // make sure to define this secret in your .env file
      { expiresIn: "1h" } // Token expiration time
    );

    // 4. Return the token as a response
    return NextResponse.json({ message: "Login successful", token }, { status: 200 });

  } catch (err) {
    console.error("🔥 Login error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


