
import { NextResponse } from 'next/server';
import { parse } from 'url';
import Product from '@/models/prouduct'; // Import the Product model
import connectMongoDB from '@/db/db';
export async function GET(request) {
  try {
    await connectMongoDB(); // Connect to your MongoDB database

    const { query } = parse(request.url, true);
    const { page = 1, limit = 10 } = query; // Default page is 1 and limit is 10, you can adjust as needed

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const products = await Product.find({}).skip(skip).limit(parseInt(limit)); // Skip certain number of items and limit the number of items per page

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.error(error);
  }
}
export async function POST(request) {
  try {
    await connectMongoDB();

    const {
      userId,
      userName,
      shippings,
      productImage1,
      productImage2,
      productImage3,
      productImage4,
      productImage5,
      designers,
      productName,
      size,
      color,
      price,
      floorPrice,
      description,
      vendor,
      condition,
      department,
      category,
      subcategory,
      tag,
      acceptOffer,
    } = await request.json();

    const newProduct = await Product.create({
      userId,
      userName,
      shippings,
      productImage1,
      productImage2,
      productImage3,
      productImage4,
      productImage5,
      designers,
      productName,
      size,
      color,
      price,
      floorPrice,
      description,
      vendor,
      condition,
      department,
      category,
      subcategory,
      tag,
      acceptOffer,
    });

    return NextResponse.json({ message: "Product Created", product: newProduct }, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.error(error);
  }
} 
