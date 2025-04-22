import connectDB from "../../../../config/mongodb";
/*import Event from "@/models/eventSchema"; */
import eventSchema from "../../../models/eventSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from 'mongoose';

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export async function GET(request: NextRequest) {
    await connectDB("Events");
    const Events = await Event.find();
    return NextResponse.json({Events}, {status: 200});
}

export async function POST(request: NextRequest) {
    const {owner, name, date, location, description, imageUrl, startTime, endTime} = await request.json();
    await connectDB("Events");
    const newEvent = new Event({
      owner,
      name,
      date,
      location,
      description,
      imageUrl,
      startTime,
      endTime
    });
    await newEvent.save();
    return NextResponse.json({message: "Event created successfully"}, {status: 201});
}