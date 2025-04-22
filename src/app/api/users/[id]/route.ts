import connectDB from "../../../../../config/mongodb";
import userSchema from "@/models/userSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";        


interface RouteParams {
    params: { id: string };
}

export async function GET (request: NextRequest, { params }: RouteParams) {
    
    const { id } = params;
    const conn = await connectDB("Users"); 
    if (!conn) {
        return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
    }
    const User = conn.models.User || conn.model("User", userSchema);
    const event = await User.findOne({ _id: id });
    return NextResponse.json({event}, {status: 200});
}