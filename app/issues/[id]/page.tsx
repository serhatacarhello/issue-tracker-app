import prisma from '@/prisma/db'
import { notFound } from 'next/navigation'
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { IssueStatusBadge, Link } from '@/app/components'
import ReactMarkdown from "react-markdown"
import { Pencil2Icon } from '@radix-ui/react-icons'
import IssueDetails from './IssueDetails'
import EditIssueButton from './EditIssueButton'

interface Props {
    params: { id: string }
}
export default async function IssueDetailPage({ params }: Props) {

    const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) } })
    if (!issue) notFound()

    return (
        <Grid columns={{ initial: "1", md: "2" }} gap={"5"}>
            <Box>
                <IssueDetails issue={issue} />
            </Box>
            <Box>
                <EditIssueButton issueId={issue.id} />
            </Box>

        </Grid >
    )
}
