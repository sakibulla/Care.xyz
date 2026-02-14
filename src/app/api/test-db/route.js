import { dbConnect, collections } from "@/lib/dbConnect";

export async function GET() {
  try {
    const usersCollection = await dbConnect(collections.USERS);
    const count = await usersCollection.countDocuments();
    
    return Response.json({ 
      success: true, 
      message: "MongoDB connected successfully", 
      userCount: count,
      database: process.env.DBNAME,
    });
  } catch (error) {
    return Response.json({ 
      success: false, 
      error: error.message,
      stack: error.stack,
    }, { status: 500 });
  }
}
