import Product from "@/models/prouduct"
import { NextResponse } from "next/server";
import connectMongoDB from '@/db/db';

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const products = await Product.findOne({ _id: id });
    return NextResponse.json({ products }, { status: 200 });
}
export async function  DELETE (req,{ params }){
    const { id } = params;
    const record = {_id:id}
    await connectMongoDB()
    const res = await Product.deleteOne(record)
    return NextResponse.json({res,success:true})
    
}