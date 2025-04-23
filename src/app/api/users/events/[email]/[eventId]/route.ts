import connectDB from "../../../../../../../config/mongodb";
import User from "@/models/userSchema"; // importing the model, not the schema
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: {
    email: string;
    eventId: string;
  };
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const { email, eventId } = params;

  await connectDB("Users");

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $pull: { events: eventId } },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Event removed", user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Error deleting event from user:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
