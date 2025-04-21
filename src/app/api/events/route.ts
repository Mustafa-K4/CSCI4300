import connectMongoDB from "../../../../config/mongodb";
import Event from "@/models/eventSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    await connectMongoDB("Events");
    const Events = await Event.find();
    return NextResponse.json({Events}, {status: 200});
}

export async function POST(request: NextRequest) {
    const {owner, name, date, location, description, imageURL, startTime, endTime} = await request.json();
    await connectMongoDB("Events");
    Event.create({owner, name, date, location, description, imageURL, startTime, endTime});
    return NextResponse.json({message: "Event created successfully"}, {status: 201});
}
