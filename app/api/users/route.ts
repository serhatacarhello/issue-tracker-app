import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";
console.log("🚀 ~ prisma:", prisma)
import { Prisma } from "@prisma/client";
console.log("🚀 ~ Prisma:", Prisma)
export  default async  function GET(request: NextRequest) {
    const users = await prisma.user.findMany({
        orderBy:{name:"asc"}
    })
    return NextResponse.json(users)
}