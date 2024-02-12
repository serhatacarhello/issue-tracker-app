import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

export default function IssueActions() {
    return (
        <Button mb={"5"}><Link href={"/issues/new"}>New Issue
        </Link>
        </Button>
    )
}
