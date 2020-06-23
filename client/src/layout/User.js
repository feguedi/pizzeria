import React from 'react'
import { Flex } from '@chakra-ui/core'

export default ({ children }) => (
    <Flex 
        direction="column" 
        alignItems="center" 
        justifyContent="center" 
        style={{ minHeight: "100vh" }}
    >
        {children}
    </Flex>
)
