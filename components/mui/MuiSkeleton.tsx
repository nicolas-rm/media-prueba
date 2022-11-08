import React from 'react'
import { Box, Skeleton } from '@mui/material'

const MuiSkeleton = () => {
    return (
        <Box sx={{ width: '100%', margin: 'auto', '& .MuiSkeleton-root': { minHeight: '7vh' } }}>
            <Skeleton />
            <Skeleton animation={ false } />
            <Skeleton animation="wave" />
            <Skeleton animation={ false } />
            <Skeleton animation="wave" />
        </Box>
    )
}

export default MuiSkeleton
