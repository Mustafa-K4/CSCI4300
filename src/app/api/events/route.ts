import connectMongoDB from "../../../../config/mongodb";
import Event from "@/models/eventSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    await connectMongoDB("Events");
}

export async function POST(request: NextRequest) {
    await connectMongoDB("Events");
}
