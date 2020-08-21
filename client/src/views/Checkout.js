import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Stack, Heading, Text } from '@chakra-ui/core'
import UserLayout from '../layout/User'

export default () => {
    const [localData, setLocalData] = useState(null)

    useEffect(() => {
        setLocalData(localStorage.getItem('eracleos orders'))
    }, [])

    return (
        <UserLayout>
            <Stack align="center">
                <Heading as="h2">Checar órdenes para pagar</Heading>
                <Text>Órdenes que ha hecho este usuario y que se van a pagar</Text>
            </Stack>
        </UserLayout>
    )
}
