import React from 'react'
import prisma from '@/prisma/db'
import { notFound } from 'next/navigation'
import delay from 'delay'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import ReactMarkdown from "react-markdown"

interface Props {
    params: { id: string }
}
export default async function IssueDetailPage({ params }: Props) {

    const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) } })
    await delay(1000)
    if (!issue) notFound()

    return (
        <div className='max-w-xl'>
            <Heading>{issue.title} </Heading>
            <Flex className='space-x-3' my={"2"}>
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            
            <Card className='prose' mt={"4"}>
                <ReactMarkdown children={issue.description} />
            </Card>
        </div>
    )
}
