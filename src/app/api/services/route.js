import { NextResponse } from "next/server";
import { dbConnect, collections } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const servicesCollection = await dbConnect(collections.SERVICES);
    
    if (id) {
      const svc = await servicesCollection.findOne({ _id: new ObjectId(id) });
      if (!svc) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
      return NextResponse.json({ success: true, data: { ...svc, _id: svc._id.toString() } });
    }

    const services = await servicesCollection.find().toArray();
    const mapped = services.map((s) => ({ ...s, _id: s._id.toString() }));
    return NextResponse.json({ success: true, data: mapped });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const servicesCollection = await dbConnect(collections.SERVICES);
    const result = await servicesCollection.insertOne(body);
    return NextResponse.json({ success: true, id: result.insertedId.toString() });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
