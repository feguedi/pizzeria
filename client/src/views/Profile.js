import React from 'react'
import { Stack, Heading, Text } from '@chakra-ui/core'
import UserLayout from '../layout/User'

export default () => (
    <UserLayout>
        <Stack align="center">
            <Heading as="h1" fontSize="4xl">Perfil</Heading>
        </Stack>
    </UserLayout>
)
