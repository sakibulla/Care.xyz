"use server";
import { collections, dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export const postUser = async (payload) => {
  try {
    const { email, password, name, nid, contact } = payload;
    
    if (!email || !password) {
      return {
        success: false,
        acknowledged: false,
        message: "Email and password are required",
      };
    }

    const usersCollection = await dbConnect(collections.USERS);
    const isExist = await usersCollection.findOne({ email });
    
    if (isExist) {
      return {
        success: false,
        acknowledged: false,
        message: "User already exists",
      };
    }

    const newUser = {
      provider: "credentials",
      name,
      email,
      password: await bcrypt.hash(password, 14),
      nid: nid || "",
      contact: contact || "",
      role: "user",
      createdAt: new Date(),
    };

    const result = await usersCollection.insertOne(newUser);
    
    // For MongoDB 3.6, check insertedId instead of acknowledged
    const isSuccess = Boolean(result.insertedId);
    
    console.log("MongoDB insert result:", result);
    console.log("InsertedId:", result.insertedId);
    console.log("Is success:", isSuccess);
    
    return {
      success: isSuccess,
      acknowledged: isSuccess,
      insertedId: result.insertedId?.toString() || null,
      message: isSuccess ? "User created successfully" : "Failed to create user",
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      success: false,
      acknowledged: false,
      message: error.message || "Failed to create user",
    };
  }
};

export const loginUser = async (payload) => {
  try {
    const { email, password } = payload;
    
    if (!email || !password) {
      return null;
    }

    const usersCollection = await dbConnect(collections.USERS);
    const user = await usersCollection.findOne({ email });
    
    if (!user) {
      return null;
    }

    // Check if user has a password (credentials provider)
    if (!user.password) {
      console.log("User registered with social login, no password set");
      return null;
    }

    const isMatched = await bcrypt.compare(password, user.password);
    
    if (isMatched) {
      return {
        id: user._id.toString(),
        provider: user.provider,
        name: user.name,
        email: user.email,
        role: user.role,
        nid: user.nid || "",
        contact: user.contact || "",
        image: user.image || null,
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error logging in user:", error);
    return null;
  }
};
