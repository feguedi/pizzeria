import React from 'react'
import { Heading, Text, Divider, Flex } from '@chakra-ui/core'
import { useLocation } from 'react-router-dom'
import GuestLayout from '../layout/Guest'

export default () => { 
    const s
    return (
        <GuestLayout>
            <Flex direction="column">
                <Heading as="h1" fontSize="4xl">Oferta</Heading>
                <Divider />
                <Text>Esta es una oferta</Text>
            </Flex>
        </GuestLayout>
    )
}
