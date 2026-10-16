import { NextResponse } from 'next/server';
import clientPromise from '@/lib/dbConnect';

export async function GET() {
  const uri_set = Boolean(process.env.MONGODB_URI);
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DBNAME);
    await db.command({ ping: 1 });
    return NextResponse.json({ connected: true, dbName: process.env.DBNAME, uri_set });
  } catch (err) {
    return NextResponse.json({ connected: false, error: err.message, uri_set }, { status: 500 });
  }
}
