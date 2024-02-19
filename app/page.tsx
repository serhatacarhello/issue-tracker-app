
import prisma from "@/prisma/db";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

export default async function Home() {

  const open = await prisma.issue.count({ where: { status: "OPEN" } })
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } })
  const inProgress = await prisma.issue.count({ where: { status: "IN_PROGRESS" } })

  return (
    <>
      <Grid columns={{ initial: "1", md: '2' }} gap={{ initial: '5', md: '2', }}>

        <Flex direction={"column"} gap={{ initial: '5', md: '2', }}>
          <IssueSummary closed={closed} inProgress={inProgress} open={open} />
          <IssueChart closed={closed} inProgress={inProgress} open={open} />
        </Flex>
        <LatestIssues />
      </Grid>
    </>


  )
}

export const dynamic = "force-dynamic"
export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "Get a concise summary of project issues and their status"
}

