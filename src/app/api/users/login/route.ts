import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../../config/mongodb";
import userSchema from "../../../../models/userSchema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // JWT package for token generation

export async function POST(request : NextRequest) {
  try {
    const conn = await connectDB("Users");

    if (!conn) {
      return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
    }

    const User = conn.models.User || conn.model("User", userSchema);

    const { email, password, events } = await request.json();

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
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in the environment variables");
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, events: user.events },
      process.env.JWT_SECRET, // make sure to define this secret in your .env file
      { expiresIn: "1h" } // Token expiration time
    );

    localStorage.setItem("authToken", token);
    
    // 4. Return the token as a response
    return NextResponse.json({ message: "Login successful", token }, { status: 200 });

  } catch (err) {
    console.error("🔥 Login error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


