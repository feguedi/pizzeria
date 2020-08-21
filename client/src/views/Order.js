import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Stack, Heading, Text } from '@chakra-ui/core'
import UserLayout from '../layout/User'

export default () => {
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        setUserData(localStorage.getItem('eracleos data'))
    }, [])

    return (
        <UserLayout>
            <Stack align="center">
                <Heading as="h2">Ordenar</Heading>
                <Text>Ordenar una pizza</Text>
            </Stack>
        </UserLayout>
    )
}
