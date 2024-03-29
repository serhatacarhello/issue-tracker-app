import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import IssueStatusFilter from './IssueStatusFilter'

export default function IssueActions() {
    return (
        <Flex justify={'between'} align={'center'}>
            <IssueStatusFilter />
            <Button>
                <Link href={"/issues/new"}>
                    New Issue
                </Link>
            </Button>
        </Flex>

    )
}
