import connectDB from "../../../../../../config/mongodb";
import userSchema from "@/models/userSchema";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { email: string } }) {
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

        return NextResponse.json({ name: `${user.firstName} ${user.lastName}` }, { status: 200 });
    } catch (error) {
        console.error("Error fetching user name:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}