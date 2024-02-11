import { NextRequest, NextResponse } from "next/server";
import * as z from "zod"
import prisma from "@/prisma/db";

const createIssueSchema= z.object({
    title: z.string().min(1, "Title is required.").max(255),
    description:z.string().min(1, "Description is required.")

})



export async function POST(request: NextRequest) {
    const body = await request.json()

    const validation = createIssueSchema.safeParse(body)
    console.log(validation)
    if (!validation.success) return NextResponse.json( validation.error.format() , { status: 400 })
    
   const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
   });
    console.log(newIssue)

    return NextResponse.json(newIssue, {status:201})
}