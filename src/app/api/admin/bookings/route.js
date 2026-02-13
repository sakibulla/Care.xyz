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

    const { bookingId, status } = await req.json();

    if (!bookingId || !status) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const validStatuses = ["Pending", "Confirmed", "Completed", "Cancelled"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid status" },
        { status: 400 }
      );
    }

    const bookingsCollection = await dbConnect(collections.BOOKINGS);
    const result = await bookingsCollection.updateOne(
      { _id: new ObjectId(bookingId) },
      { $set: { status, updatedAt: new Date() } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Booking not found or not updated" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin booking update error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
