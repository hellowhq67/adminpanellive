
import { NextResponse } from 'next/server';

import mongoose from "mongoose";
import Product from '@/models/product';
import connectMongoDB from '@/db/db';

// Define the GET function to handle HTTP GET requests
export async function GET() {
  try {
    // Ensure a single connection is established during application startup
    if (!mongoose.connection.readyState) {
      await connectMongoDB(); // Connect to MongoDB if not already connected
    }

    // Retrieve only necessary fields to reduce network overhead
    const products = await Product.find({}, { _id: 0, name: 1, price: 1 });

    console.log("Products fetched successfully:", products.length);

    // Return the products as JSON response
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    // Return an error response if there's an error
    return NextResponse.error("Failed to fetch products");
  }
}
