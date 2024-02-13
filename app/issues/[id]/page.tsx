import prisma from '@/prisma/db'
import { notFound } from 'next/navigation'
import { Box, Grid } from '@radix-ui/themes'
import IssueDetails from './IssueDetails'
import EditIssueButton from './EditIssueButton'

interface Props {
    params: { id: string }
}
export default async function IssueDetailPage({ params }: Props) {

    const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) }, })
    
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
