import React from 'react'
import { Heading, Text, Flex, Divider } from '@chakra-ui/core'
import UserLayout from '../layout/User'

export default ({ message }) => (
    <UserLayout>
        <Flex 
            direction={{ base: 'column', sm: 'row' }}
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "100vh" }}
        >
            <Heading as="h4">Error</Heading>
            <Divider
                display={{ base: 'none', sm: 'block' }}
                mx="12px"
                borderColor="#000"
                orientation="vertical"
                h="3.5rem"
                borderWidth="2px"
            />
            <Text mt={{ base: '1rem', sm: '0' }}>{message || 'Page not found'}</Text>
        </Flex>
    </UserLayout>
)
