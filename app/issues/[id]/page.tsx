import prisma from '@/prisma/db'
import { notFound } from 'next/navigation'
import { Box, Flex, Grid } from '@radix-ui/themes'
import IssueDetails from './IssueDetails'
import EditIssueButton from './EditIssueButton'
import DeleteIssueButton from './DeleteIssueButton'
import authOptions from '@/app/auth/authOptions'
import { getServerSession } from 'next-auth'
import AssigneeSelect from './AssigneeSelect'
import { cache } from 'react'

interface Props {
    params: { id: string }
}

const fetchIssue = cache(async (issueId: number) =>
    await prisma.issue.findUnique({ where: { id: issueId } })
)



export default async function IssueDetailPage({ params }: Props) {

    const session = await getServerSession(authOptions)

    const issue = await fetchIssue(parseInt(params.id))

    if (!issue) notFound()


    return (
        <Grid columns={{ initial: "1", sm: "5" }} gap={"5"}>
            <Box className='md:col-span-4'>
                <IssueDetails issue={issue} />
            </Box>
            {session && <Box>
                <Flex direction={"column"} gap={"4"}>
                    <AssigneeSelect issue={issue} />
                    <EditIssueButton issueId={issue.id} />
                    <DeleteIssueButton issueId={issue.id} />
                </Flex>
            </Box>}
        </Grid >
    )
}

export async function generateMetadata(
    { params }: Props,
) {
    // fetch data
    const issue = await fetchIssue(parseInt(params.id))

    return {
        title: issue?.title,
        description: 'Description of issue ' + issue?.id
    }
}
