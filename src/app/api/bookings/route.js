import { NextResponse } from "next/server";
import { dbConnect, collections } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { sendEmail } from "@/lib/sendEmail";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("📝 Booking request received:", JSON.stringify(body, null, 2));
    
    const {
      serviceId,
      durationType = "hour",
      duration = 1,
      location = {},
      userEmail,
      userName,
      contact,
    } = body;

    if (!serviceId || !userEmail) {
      console.log("❌ Missing required data:", { serviceId, userEmail });
      return NextResponse.json({ success: false, message: "Missing data" }, { status: 400 });
    }

    // fetch service with multiple strategies
    console.log("🔍 Fetching service with ID:", serviceId, "Type:", typeof serviceId);
    const servicesCollection = await dbConnect(collections.SERVICES);
    
    let svc = null;
    
    // Strategy 1: Try as ObjectId if it's 24 hex characters
    if (typeof serviceId === 'string' && serviceId.length === 24 && /^[0-9a-fA-F]{24}$/.test(serviceId)) {
      try {
        console.log("🔍 Strategy 1: Trying ObjectId lookup");
        svc = await servicesCollection.findOne({ _id: new ObjectId(serviceId) });
        if (svc) console.log("✅ Found by ObjectId");
      } catch (e) {
        console.log("⚠️ ObjectId lookup failed:", e.message);
      }
    }
    
    // Strategy 2: Try by slug
    if (!svc) {
      console.log("🔍 Strategy 2: Trying slug lookup");
      svc = await servicesCollection.findOne({ slug: serviceId });
      if (svc) console.log("✅ Found by slug");
    }
    
    // Strategy 3: Try as string _id
    if (!svc) {
      console.log("🔍 Strategy 3: Trying string _id lookup");
      svc = await servicesCollection.findOne({ _id: serviceId });
      if (svc) console.log("✅ Found by string _id");
    }
    
    // Strategy 4: List all services to debug
    if (!svc) {
      console.log("❌ Service not found with any strategy");
      const allServices = await servicesCollection.find({}, { projection: { _id: 1, title: 1, slug: 1 } }).limit(5).toArray();
      console.log("📋 Available services:", allServices.map(s => ({
        _id: s._id.toString(),
        _idType: typeof s._id,
        title: s.title,
        slug: s.slug
      })));
      return NextResponse.json({ 
        success: false, 
        message: "Service not found. Please try again or contact support." 
      }, { status: 404 });
    }
    
    console.log("✅ Service found:", svc.title);

    const rate = durationType === "day" ? (svc.charge_per_day || 0) : (svc.charge_per_hour || 0);
    const total = Number(rate) * Number(duration);

    const newBooking = {
      serviceId: svc._id,
      serviceTitle: svc.title,
      durationType,
      duration: Number(duration),
      rate: Number(rate),
      total: Number(total),
      location,
      userEmail,
      userName: userName || "",
      contact: contact || "",
      status: "Pending",
      createdAt: new Date(),
    };

    console.log("💾 Creating booking:", {
      serviceTitle: newBooking.serviceTitle,
      duration: newBooking.duration,
      total: newBooking.total,
      userEmail: newBooking.userEmail
    });
    
    const bookingsCollection = await dbConnect(collections.BOOKINGS);
    const result = await bookingsCollection.insertOne(newBooking);
    console.log("✅ Booking created with ID:", result.insertedId.toString());

    // send invoice email (non-blocking)
    try {
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #06b6d4; color: white; padding: 20px; text-align: center; }
            .content { background: #f8fafc; padding: 20px; }
            .booking-details { background: white; padding: 15px; margin: 15px 0; border-radius: 8px; }
            .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e2e8f0; }
            .total { font-size: 24px; font-weight: bold; color: #06b6d4; }
            .footer { text-align: center; padding: 20px; color: #64748b; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Care.xyz</h1>
              <p>Booking Confirmation</p>
            </div>
            <div class="content">
              <p>Hi ${newBooking.userName || newBooking.userEmail},</p>
              <p>Thank you for booking with Care.xyz! Your booking has been confirmed.</p>
              
              <div class="booking-details">
                <h3>Booking Details</h3>
                <div class="detail-row">
                  <span>Booking ID:</span>
                  <span><strong>${result.insertedId}</strong></span>
                </div>
                <div class="detail-row">
                  <span>Service:</span>
                  <span><strong>${newBooking.serviceTitle}</strong></span>
                </div>
                <div class="detail-row">
                  <span>Duration:</span>
                  <span>${newBooking.duration} ${newBooking.durationType}(s)</span>
                </div>
                <div class="detail-row">
                  <span>Rate:</span>
                  <span>$${newBooking.rate}/${newBooking.durationType}</span>
                </div>
                <div class="detail-row">
                  <span>Location:</span>
                  <span>${newBooking.location.division}, ${newBooking.location.district}</span>
                </div>
                <div class="detail-row">
                  <span>Status:</span>
                  <span><strong>${newBooking.status}</strong></span>
                </div>
                <div class="detail-row" style="border: none; margin-top: 15px;">
                  <span style="font-size: 18px;">Total Amount:</span>
                  <span class="total">$${newBooking.total}</span>
                </div>
              </div>
              
              <p>Our team will contact you shortly to confirm the schedule and caregiver details.</p>
              <p>If you have any questions, please contact us at support@care.xyz</p>
            </div>
            <div class="footer">
              <p>Care.xyz - Professional Caregiving Services</p>
              <p>© 2024 Care.xyz. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `;
      await sendEmail({ 
        to: newBooking.userEmail, 
        subject: "Care.xyz - Booking Confirmation & Invoice", 
        html 
      });
      console.log("✅ Email sent to:", newBooking.userEmail);
    } catch (e) {
      console.error("❌ Email send failed:", e.message);
    }

    return NextResponse.json({ success: true, bookingId: result.insertedId.toString() });
  } catch (err) {
    console.error("❌ Booking error:", err);
    return NextResponse.json({ 
      success: false, 
      message: "Server error: " + err.message 
    }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    if (!email) return NextResponse.json({ success: false, message: "email required" }, { status: 400 });

    const bookingsCollection = await dbConnect(collections.BOOKINGS);
    const bookings = await bookingsCollection.find({ userEmail: email }).sort({ createdAt: -1 }).toArray();
    const mapped = bookings.map((b) => ({ 
      ...b, 
      _id: b._id.toString(), 
      serviceId: b.serviceId.toString() 
    }));
    return NextResponse.json({ success: true, data: mapped });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ success: false, message: "id required" }, { status: 400 });
    const bookingsCollection = await dbConnect(collections.BOOKINGS);
    await bookingsCollection.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
