import React from 'react'
import { Flex, Stack } from '@chakra-ui/core'

export default ({ children }) => (
    <Stack h="100vh">
        <Flex
            direction="column"
            justifyContent="center"
            style={{ minHeight: '100%' }}
        >
            {children}
        </Flex>
    </Stack>
)
