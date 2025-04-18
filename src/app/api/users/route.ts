import connectMongoDB from "../../../../config/mongodb";
import User from "../../../models/userSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest) {
    await connectMongoDB("Users");
}

export async function POST(request: NextRequest) {
    await connectMongoDB("Users");
}