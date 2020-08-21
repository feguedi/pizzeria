import React from 'react'
import { Heading, Grid, Flex } from '@chakra-ui/core'

export default ({ children }) => (
    <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={8}>
        {children}
    </Grid>
)
