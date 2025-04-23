import connectDB from "../../../../../../config/mongodb";
import userSchema from "@/models/userSchema";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { email: string } }) {
    const { email } = await params;

    try {
        const conn = await connectDB("Users");
        if (!conn) {
            return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
        }

        const User = conn.models.User || conn.model("User", userSchema);
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ events: user.events }, { status: 200 });
    } catch (error) {
        console.error("Error fetching user events:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: NextRequest, { params }: { params: { email: string } }) {
    const { email } = await params;

    try {
        const conn = await connectDB("Users");
        if (!conn) {
            return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
        }

        const User = conn.models.User || conn.model("User", userSchema);

        // Parse the request body
        const { events } = await request.json();

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Update the user's events
        user.events = events;
        await user.save();

        return NextResponse.json({ message: "User events updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating user events:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { email: string; eventId: string } }) {
    const { email, eventId } = params;

    try {
        const conn = await connectDB("Users");
        if (!conn) {
            return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
        }

        const User = conn.models.User || conn.model("User", userSchema);

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const updatedEvents = user.events
            .split(",")
            .filter(id => id !== eventId)
            .join(",");

        user.events = updatedEvents;
        await user.save();

        return NextResponse.json({ message: "Event removed from user successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error removing event from user:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
