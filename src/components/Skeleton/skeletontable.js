import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const Skeletontable = () => {
  return (
    <div className='skeletontable'>
        <Stack spacing={1} className='stack'>
            <Skeleton variant="rounded" width={750} height={50} />
        </Stack>
        <Stack spacing={1} className='stack'>
            <Skeleton variant="rounded" width={750} height={50} />
        </Stack>
        <Stack spacing={1} className='stack'>
            <Skeleton variant="rounded" width={750} height={50} />
        </Stack>
        <Stack spacing={1} className='stack'>
            <Skeleton variant="rounded" width={750} height={50} />
        </Stack>
        <Stack spacing={1} className='stack'>
            <Skeleton variant="rounded" width={750} height={50} />
        </Stack>
        <Stack spacing={1} className='stack'>
            <Skeleton variant="rounded" width={750} height={50} />
        </Stack>
        <Stack spacing={1} className='stack'>
            <Skeleton variant="rounded" width={750} height={50} />
        </Stack>
        <Stack spacing={1} className='stack'>
            <Skeleton variant="rounded" width={750} height={50} />
        </Stack>
        <Stack spacing={1} className='stack'>
            <Skeleton variant="rounded" width={750} height={50} />
        </Stack>
    </div> 
  )
}

export default Skeletontable