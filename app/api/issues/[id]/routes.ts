import { issueSchema } from "@/app/validationSchemas"
import prisma from "@/prisma/db"
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest, 
  { params }: { params: { id: string }}) {
    console.log(params, "patch")

    const body = await request.json()

    if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
}
    const validation = issueSchema.safeParse(body)
    if (!validation.success) return NextResponse.json(validation.error.format(), { status: 400 })
    
    const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) } })
    

    if (!issue) return NextResponse.json({ error: "Invalid issue" }, { status: 404 })
    
    if (issue.title === body.title && issue.description === body.description) {
    return NextResponse.json({ error: "No changes detected" }, { status: 400 });
}
    
    const updatedIssue = await prisma.issue.update({
        where: { id: issue.id },
        data: {
        title: body.title,
        description:body.description}
    })
console.log(updatedIssue)
    return NextResponse.json(updatedIssue)
    
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }) {

    const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) } })

    if (!issue) return NextResponse.json({ error: "Invalid issue" }, { status: 404 })
    
    await prisma.issue.delete({ where: { id: issue.id } })    

    return NextResponse.json({}) 
}
