import React, { useState, useEffect } from 'react'
import { Heading, Text, Divider, Flex } from '@chakra-ui/core'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import ErrorComponent from '../views/Error404'
import GuestLayout from '../layout/Guest'

export default () => { 
    const { id } = useLocation()
    const [offerData, setOfferData] = useState(null)
    const [error, setError] = useState({ err: false, message: '' })

    const getData = async () => {
        try {
            const SERVER_URI = process.env.REACT_APP_SERVER_URI
            const req_uri = `${ SERVER_URI }/api/promocion/${ id }`
            const response = await (await axios.get(req_uri)).data
            setOfferData(response['promocion'])
        } catch (error) {
            if (error.response.data) {
                setError({ err: true, message: error.response.data.message })
            } else {
                setError({ err: true, message: error.message })
            }
        }
    }

    useEffect(() => {
        getData()
    }, [id])

    if (error.err) {
        return (
            <ErrorComponent message={error.message} />
        )
    }

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
