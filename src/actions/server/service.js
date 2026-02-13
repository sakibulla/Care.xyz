"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import fs from "fs";
import path from "path";

export const getServices = async () => {
  try {
    const servicesCollection = await dbConnect(collections.SERVICES);
    const services = await servicesCollection.find().toArray();
    if (services && services.length) {
      // Convert ObjectId to string for all services
      return services.map(s => ({ ...s, _id: s._id.toString() }));
    }

    // bootstrap from data file if DB empty
    try {
      const p = path.join(process.cwd(), "src", "data", "services.json");
      const raw = fs.readFileSync(p, "utf8");
      const data = JSON.parse(raw);
      // convert _id to ObjectId when inserting
      const toInsert = data.map((s) => {
        const copy = { ...s };
        delete copy._id;
        return copy;
      });
      if (toInsert.length) {
        await servicesCollection.insertMany(toInsert);
        const inserted = await servicesCollection.find().toArray();
        return inserted.map(s => ({ ...s, _id: s._id.toString() }));
      }
    } catch (err) {
      console.error("bootstrap services failed", err);
    }

    return [];
  } catch (error) {
    console.error("Failed to fetch services:", error.message);
    return [];
  }
};

export const getSingleService = async (idOrSlug) => {
  if (!idOrSlug) {
    console.log("❌ No ID or slug provided");
    return null;
  }
  
  console.log("🔍 Looking for service:", idOrSlug, "Length:", idOrSlug.length);
  
  try {
    const servicesCollection = await dbConnect(collections.SERVICES);
    let svc = null;
    
    // Try to find by ObjectId first if it looks like a valid ObjectId (24 hex characters)
    if (idOrSlug.length === 24 && /^[0-9a-fA-F]{24}$/.test(idOrSlug)) {
      try {
        console.log("🔍 Searching by ObjectId:", idOrSlug);
        svc = await servicesCollection.findOne({ _id: new ObjectId(idOrSlug) });
        if (svc) {
          console.log("✅ Found by ObjectId:", svc.title);
        }
      } catch (e) {
        console.log("⚠️ ObjectId search failed:", e.message);
      }
    }
    
    // If not found by ObjectId, try by slug
    if (!svc) {
      console.log("🔍 Searching by slug:", idOrSlug);
      svc = await servicesCollection.findOne({ slug: idOrSlug });
      if (svc) {
        console.log("✅ Found by slug:", svc.title);
      }
    }
    
    // If still not found, try by string _id (in case it's stored as string)
    if (!svc) {
      console.log("🔍 Searching by string _id:", idOrSlug);
      svc = await servicesCollection.findOne({ _id: idOrSlug });
      if (svc) {
        console.log("✅ Found by string _id:", svc.title);
      }
    }
    
    if (!svc) {
      console.log("❌ Service not found for:", idOrSlug);
      return null;
    }
    
    return { ...svc, _id: svc._id.toString() };
  } catch (error) {
    console.error("❌ Failed to fetch service:", error.message);
    return null;
  }
};
