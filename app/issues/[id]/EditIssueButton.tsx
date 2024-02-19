"use client"

import { Spinner } from '@/app/components';
import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import { useState } from 'react';

export default function EditIssueButton({ issueId }: { issueId: number }) {
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setLoading(true)
    }

    return (
        <Button onClick={handleClick} disabled={loading}>
            <Pencil2Icon />
            <Link href={`/issues/edit/${issueId}`} >Edit Issue</Link>
            {loading && <Spinner />}
        </Button>
    )
}
