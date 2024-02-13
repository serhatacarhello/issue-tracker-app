import { Button } from '@radix-ui/themes'
import Link from 'next/link'

export default function IssueActions() {
    return (
        <Button mb={"5"}><Link href={"/issues/new"}>New Issue
        </Link>
        </Button>
    )
}
