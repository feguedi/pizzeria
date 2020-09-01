import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { Flex, Heading, Text } from '@chakra-ui/core'
import GuestLayout from '../layout/Guest'
import ErrorView from '../views/Error404'

export default () => {
    const { id } = useLocation()
    const [data, setData] = useState({})
    const [error, setError] = useState({ err: false, message: '' })

    const getData = async () => {
        try {
            const SERVER_URI = process.env.REACT_APP_SERVER_URI
            const req_uri = `${ SERVER_URI }/api/promocion/${ id }`
            const response = await (await axios.get(req_uri)).data
            setData(response['especialidad'])
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
    }, [])

    if (error.err) {
        return <ErrorView message={error.message} />
    }

    return (
        <GuestLayout>
            <Flex>
                <Heading>{}</Heading>
            </Flex>
        </GuestLayout>
    )
}
