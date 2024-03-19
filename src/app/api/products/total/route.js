
import { NextResponse } from 'next/server';

import Product from '@/models/prouduct'; // Import the Product model
import connectMongoDB from '@/db/db';
export async function GET() {
  try {
    await connectMongoDB(); // Connect to your MongoDB database

    const products = await Product.find({}); // Retrieve all products from the database

    return NextResponse.json({ products }); // Return the products as JSON response
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.error(error); // Return an error response if there's an error
  }
}