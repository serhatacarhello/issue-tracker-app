import Spinner from '@/app/components/Spinner'
import { Box } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'

export default function LoadingNewIssuePage() {
    return (
        <Box className='max-w-xl'>
            <Skeleton />
            <Skeleton height={"20rem"} />
        </Box>
    )
}
