import connectMongoDB from '@/db/db';
import Follow from '@/models/follow';
import { NextResponse } from 'next/server';

// POST endpoint to follow a product
export async function POST(request) {
    try {
        await connectMongoDB();

        // Extract userId and productId from the request body
        const { userId, productId } = await request.json();

        // Check if the user is already following the product
        const existingFollow = await Follow.findOne({ userId, productId });

        if (existingFollow) {
            return NextResponse.json({ message: "You are already following this product" }, { status: 400 });
        }

        // Create a new follow record
        const followProduct = await Follow.create({
            userId,
            productId,
        });

        return NextResponse.json({ message: "Follow success", followProduct }, { status: 201 });
    } catch (error) {
        console.error("Error following product:", error);
        return NextResponse.error(error);
    }
}
export async function DELETE(request, { params }) {
    try {
        await connectMongoDB();

        const { id } = params;

        // Find and delete the follow record
        await Follow.findOneAndDelete({ id });

        return NextResponse.json({ message: "Unfollowed successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error unfollowing product:", error);
        return NextResponse.error(error);
    }
}