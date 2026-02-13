import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { dbConnect, collections } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function PATCH(req) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { userId, role } = await req.json();

    if (!userId || !role) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const validRoles = ["user", "admin"];
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { success: false, message: "Invalid role" },
        { status: 400 }
      );
    }

    // Prevent admin from demoting themselves
    if (userId === session.user.id && role === "user") {
      return NextResponse.json(
        { success: false, message: "Cannot demote yourself" },
        { status: 400 }
      );
    }

    const usersCollection = await dbConnect(collections.USERS);
    const result = await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { role } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { success: false, message: "User not found or not updated" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin user update error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
