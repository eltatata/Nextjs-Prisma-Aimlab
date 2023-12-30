import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/libs/prisma";

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        const data = await req.json()

        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        })

        const score = await prisma.score.create({
            data: {
                points: data.counter,
                authorId: user.id
            }
        })

        return NextResponse.json(score);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}