import { Box, Card, Flex } from '@radix-ui/themes'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import Skeleton from 'react-loading-skeleton'

export default function LoadingIssueDetailPage() {
    return (
        <Box className='max-w-xl'>
            <div className="flex items-center justify-center space-x-2 animate-pulse">
                <AiFillBug className="h-8 w-8 text-indigo-500" />
            </div>
            <Skeleton />
            <Flex className='space-x-3' my={"2"}>
                <Skeleton width={"5rem"} />
                <Skeleton width={"8rem"} />
            </Flex>

            <Card className='prose' mt={"4"}>
                <Skeleton count={3} />
            </Card>
        </Box>

    )
}
