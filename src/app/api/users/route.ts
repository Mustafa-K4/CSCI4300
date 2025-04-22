import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../config/mongodb";
import userSchema from "../../../models/userSchema";
import bcrypt from "bcryptjs";

export async function POST(request : NextRequest) {
  try {
    const conn = await connectDB("Users");
    if (!conn) {
      return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
    }
    const User = conn.models.User || conn.model("User", userSchema);

    const { firstName, lastName, email, password } = await request.json();

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });

  } catch (err) {
    console.error("🔥 Signup error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


