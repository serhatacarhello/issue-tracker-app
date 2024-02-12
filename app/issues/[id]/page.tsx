import React from 'react'
import prisma from '@/prisma/db'
import { notFound } from 'next/navigation'
import delay from 'delay'

interface Props {
    params: { id: string }
}
export default async function IssueDetailPage({ params }: Props) {

    const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) } })
    await delay(1000)
    if (!issue) notFound()

    return (
        <div>
            <p>{issue.title} </p>
            <p>{issue.description} </p>
            <p>{issue.status} </p>
            <p>{issue.createdAt.toDateString()} </p>
        </div>
    )
}
