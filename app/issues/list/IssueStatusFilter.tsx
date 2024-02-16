"use client"

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'

const statuses: { label: string, value?: Status, }[] = [
    { label: "All" },
    { label: "Open", value: 'OPEN' },
    { label: "In Progress", value: 'IN_PROGRESS' },
    { label: "Closed", value: 'CLOSED' }
]

export default function IssueStatusFilter() {
    const router = useRouter()

    const routerQuery = (status: string) => {
        const query = status ? `?status=${status}` : '';
        router.push('/issues/list' + query)
    }

    return (
        <Select.Root onValueChange={routerQuery}>
            <Select.Trigger placeholder='Filter by status...' />
            <Select.Content>
                {statuses.map((status) => (
                    <Select.Item key={status.value} value={status.value || ""}>{status.label} </Select.Item>
                ))}
            </Select.Content>
        </Select.Root>
    )
}