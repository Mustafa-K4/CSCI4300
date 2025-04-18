import connectDB from "../../../../../config/mongodb";
import Event from "@/models/eventSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

interface RouteParams {
    params: { id: string };
}

export async function GET (request: NextRequest, { params }: RouteParams) {
    
    const { id } = params;
    await connectDB("Events");
    const event = await Event.findOne({ _id: id });
    return NextResponse.json({event}, {status: 200});
}
   