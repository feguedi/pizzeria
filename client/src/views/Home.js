import React from 'react'
import { Heading, Text, Stack } from '@chakra-ui/core'
import UserLayout from '../layout/User'

export default () => (
    <UserLayout>
        <Stack align="center">
            <Heading as="h2">Welcome</Heading>
            <Text>Using Chakra-UI for web application</Text>
        </Stack>
    </UserLayout>
)
