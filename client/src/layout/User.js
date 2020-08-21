import React from 'react'
import { Flex } from '@chakra-ui/core'
import Header from '../components/Header'

export default ({ children }) => (
    <Flex 
        direction="column" 
        alignItems="center" 
        justifyContent="center" 
        style={{ minHeight: "100vh" }}
    >
        <Header />
        {children}
    </Flex>
)
