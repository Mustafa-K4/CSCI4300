import connectDB from "../../../../../config/mongodb";
import Event from "@/models/eventSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

interface RouteParams {
    params: { id: string };
}

export async function GET (request: NextRequest, { params }: RouteParams) { 
    const { id } = await params;
    await connectDB("Events");
    const event = await Event.findOne({ _id: id });
    return NextResponse.json({event}, {status: 200});
}

export async function POST(request: NextRequest, { params }: RouteParams) {
    const { id } = params;
    const { name, date, location, description, imageUrl, startTime, endTime } = await request.json();  
    await connectDB("Events");
    try {
      const upsertedEvent = await Event.findByIdAndUpdate(
        id,
        { name, date, location, description, imageUrl, startTime, endTime },
        { new: true, runValidators: true, upsert: true }
      );
      return NextResponse.json({ message: "Event upserted", event: upsertedEvent }, { status: 200 });
    } catch (error) {
      console.error("Error upserting event:", error);
      return NextResponse.json({ error: "Failed to upsert event" }, { status: 500 });
    }
  }

export async function DELETE (request: NextRequest, { params }: RouteParams) {
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
    }
    await connectDB("Events");
    const deletedItem = await Event.findByIdAndDelete(id);
    if (!deletedItem) {
        return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Item deleted" }, { status: 200 });
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
  }

  const { name, date, location, description, imageUrl, startTime, endTime } = await request.json();
  await connectDB("Events");

  try {
      const updatedEvent = await Event.findByIdAndUpdate(
          id,
          { name, date, location, description, imageUrl, startTime, endTime },
          { new: true, runValidators: true } // `new: true` returns the updated document
      );

      if (!updatedEvent) {
          return NextResponse.json({ message: "Event not found" }, { status: 404 });
      }

      return NextResponse.json({ message: "Event updated successfully", event: updatedEvent }, { status: 200 });
  } catch (error) {
      console.error("Error updating event:", error);
      return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
  }
}