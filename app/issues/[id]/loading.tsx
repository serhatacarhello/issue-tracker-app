import React from 'react'
import { AiFillBug } from 'react-icons/ai'

export default function LoadingIssueDetailPage() {
    return (
        <div className="flex items-center justify-center space-x-2 animate-pulse">
            <AiFillBug className="h-8 w-8 text-indigo-500" />
        </div>
    )
}
