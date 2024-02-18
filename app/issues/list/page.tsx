import { Flex } from "@radix-ui/themes";
import prisma from "../../../prisma/db";
import IssueActions from "./IssueActions";
import { Status } from "@prisma/client";
import Pagination from "@/app/components/Pagination";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";
import { Metadata } from "next";

interface Props {
    searchParams: IssueQuery,
}

export default async function IssuesPage({ searchParams, }: Props) {

    const statuses = Object.values(Status)

    const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;

    const where = { status }

    const orderBy = columnNames.includes(searchParams.orderBy) ? { [searchParams.orderBy]: "asc" } : undefined;

    const page = parseInt(searchParams.page) || 1;
    const pageSize = 10;

    const issues = await prisma.issue.findMany({ where, orderBy, skip: (page - 1) * pageSize, take: pageSize });

    const issueCount = await prisma.issue.count({ where })

    return <Flex direction={"column"} gap={"3"}>
        {/* new issue btn */}
        <IssueActions />
        <IssueTable searchParams={searchParams} issues={issues} />
        <Flex justify={"center"}>
            <Pagination currentPage={page} itemCount={issueCount} pageSize={pageSize} />
        </Flex>
    </Flex>;
}


export const dynamic = "force-dynamic"

export const metadata: Metadata = {
    title: 'Issue Tracker - Issue List',
    description: "Explore and manage project issues efficiently"

}