import prisma from '@/prisma/db'
import { notFound } from 'next/navigation'
import { Box, Flex, Grid } from '@radix-ui/themes'
import IssueDetails from './IssueDetails'
import EditIssueButton from './EditIssueButton'
import DeleteIssueButton from './DeleteIssueButton'
import delay from "delay"
import authOptions from '@/app/auth/authOptions'
import { getServerSession } from 'next-auth'

interface Props {
    params: { id: string }
}
export default async function IssueDetailPage({ params }: Props) {
    const session = await getServerSession(authOptions)

    const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) }, })

    if (!issue) notFound()

    await delay(1000)

    return (
        <Grid columns={{ initial: "1", sm: "5" }} gap={"5"}>
            <Box className='md:col-span-4'>
                <IssueDetails issue={issue} />
            </Box>
            {session && <Box>
                <Flex direction={"column"} gap={"4"}>
                    <EditIssueButton issueId={issue.id} />
                    <DeleteIssueButton issueId={issue.id} />
                </Flex>
            </Box>}
        </Grid >
    )
}
