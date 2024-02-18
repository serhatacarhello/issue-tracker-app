
import prisma from "@/prisma/db";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";

export default async function Home() {

  const open = await prisma.issue.count({ where: { status: "OPEN" } })
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } })
  const inProgress = await prisma.issue.count({ where: { status: "IN_PROGRESS" } })

  return (
    <>
      <LatestIssues />
      <IssueSummary closed={closed} inProgress={inProgress} open={open} />
    </>
  )
}
