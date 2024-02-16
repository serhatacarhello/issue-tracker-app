"use client"

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams, } from 'next/navigation'

const statuses: { label: string, value?: Status, }[] = [
    { label: "All" },
    { label: "Open", value: 'OPEN' },
    { label: "In Progress", value: 'IN_PROGRESS' },
    { label: "Closed", value: 'CLOSED' }
]

export default function IssueStatusFilter() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const routerQuery = (status: string) => {
        const params = new URLSearchParams()

        if (status) params.append("status", status)
        console.log("🚀 ~ routerQuery ~ params:", params)

        if (searchParams.get("orderBy")) params.append("orderBy", searchParams.get("orderBy")!)
        console.log(searchParams.get("orderBy"))
        console.log("🚀 ~ routerQuery ~ params:", params)

        const query = params.size ? "?" + params.toString() : "";
        router.push('/issues/list' + query)
        console.log("🚀 ~ routerQuery ~ params:", params)
    }

    return (
        <Select.Root onValueChange={routerQuery}
            defaultValue={searchParams.get("status") || ""}>
            <Select.Trigger placeholder='Filter by status...' />
            <Select.Content>
                {statuses.map((status) => (
                    <Select.Item key={status.value} value={status.value || ""}>{status.label} </Select.Item>
                ))}
            </Select.Content>
        </Select.Root>
    )
}
