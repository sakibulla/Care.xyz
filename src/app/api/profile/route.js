import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, contact, nid } = body;

    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { success: false, message: "Name is required" },
        { status: 400 }
      );
    }

    const usersCollection = await dbConnect(collections.USERS);

    // Update user profile
    const result = await usersCollection.updateOne(
      { email: session.user.email },
      {
        $set: {
          name: name.trim(),
          contact: contact?.trim() || "",
          nid: nid?.trim() || "",
        },
      }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { success: false, message: "No changes made or user not found" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Profile updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const usersCollection = await dbConnect(collections.USERS);
    const user = await usersCollection.findOne(
      { email: session.user.email },
      { projection: { password: 0 } } // Exclude password
    );

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          contact: user.contact || "",
          nid: user.nid || "",
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
