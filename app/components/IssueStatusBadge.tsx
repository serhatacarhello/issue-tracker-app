
import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import { AiFillBug } from "react-icons/ai";


const StatusMap: Record<Status, { label: string, color: "red" | "violet" | "green" }> = {
    OPEN: { label: "Open", color: "red" },
    IN_PROGRESS: { label: "In Progress", color: "violet" },
    CLOSED: { label: "Closed", color: "red" }
}


export default function IssueStatusBadge({ status }: { status: Status }) {
    return (
        <Badge color={StatusMap[status].color}
        > {StatusMap[status].label}<AiFillBug className={`text-${StatusMap[status].color}-500`} /> </Badge>
    )
}
