import React from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
export default function IssuesPage() {
  return <div className="ml-5">
    <Button><Link href={"/issues/new"}>New Issue
    </Link> </Button>
  </div> 
}
