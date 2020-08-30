import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Stack, Heading, Text } from '@chakra-ui/core'
import axios from 'axios'
import ErrorComponent from './Error404'
import UserLayout from '../layout/User'

export default () => {
    const [data, setData] = useState(null)
    const [error, setError] = useState({ err: false, message: '' })
    const { id } = useParams()

    const getOrderData = async () => {
        try {
            const SERVER_URI = process.env.REACT_APP_SERVER_URI
            const requestURI = `${ SERVER_URI }/api/pedidos/${ id }`
            const orderData = await (await axios.get(requestURI)).data
            setData(orderData)
            console.log('data:', orderData)
        } catch (error) {
            setError({ err: true, message: error.message })
        }
    }

    useEffect(() => {
        getOrderData()
    }, [])

    if (error.err) {
        return (
            <ErrorComponent message="Orden no encontrada"/>
        )
    }

    return (
        <UserLayout>
            <Stack m="auto" my="4rem" align="center">
                <Heading as="h1" fontSize="4xl">Orden</Heading>
                <Text>Una orden en específico</Text>
                
            </Stack>
        </UserLayout>
    )
}
