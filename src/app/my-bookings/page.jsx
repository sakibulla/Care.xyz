import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import BookingsList from "@/components/booking/BookingsList";
import { collections, dbConnect } from "@/lib/dbConnect";

export default async function MyBookingsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`/login?callbackUrl=/my-bookings`);
  }

  let bookings = [];
  
  try {
    const email = session.user.email;
    
    // Fetch bookings directly from database instead of API route
    const bookingsCollection = await dbConnect(collections.BOOKINGS);
    const result = await bookingsCollection
      .find({ userEmail: email })
      .sort({ createdAt: -1 })
      .toArray();
    
    // Convert MongoDB documents to plain objects
    bookings = result.map(booking => ({
      ...booking,
      _id: booking._id.toString(),
      createdAt: booking.createdAt?.toISOString() || new Date().toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching bookings:", error);
    // Return empty array on error - page will still render
  }

  return (
    <div className="py-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">
          My <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Bookings</span>
        </h1>
        <p className="text-gray-600">View and manage your care service bookings</p>
      </div>
      <BookingsList initial={bookings} />
    </div>
  );
}
