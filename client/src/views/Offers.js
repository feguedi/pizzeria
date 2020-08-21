import React, { useState, useEffect } from 'react'
import { Stack, Flex, Heading, Text } from '@chakra-ui/core'
import { Link } from 'react-router-dom'
import axios from 'axios'
import GuestLayout from '../layout/Guest'
import CustomGrid from '../components/CustomGrid'
import PromocionItem from '../components/items/PromocionItem'
import ErrorComponent from './Error404'

export default () => {
    const [data, setData] = useState(null)
    const [error, setError] = useState({ err: false, message: '' })

    const getData = async () => {
        try {
            const SERVER_URI = process.env.REACT_APP_SERVER_URI
            const req_uri = process.env.NODE_ENV !== 'production' ? `${ SERVER_URI }/promociones` : `${ SERVER_URI }/api/promociones`
            const promociones = await (await axios.get(req_uri)).data
            setData(promociones)
        } catch (error) {
            setError({ err: true, message: error.message })
        }
    }

    useEffect(() => {
        getData()
    }, [])

    if (error.err) {
        return (
            <ErrorComponent message={ error.message } />
        )
    }

    return (
        <GuestLayout>
            <Stack>
                <Heading my="2rem" as="h1" fontSize="4xl">Promociones</Heading>
                <CustomGrid>
                    {data.map(promocion => (
                        <Link to={`/${ promocion.id }`} key={promocion.id}>
                            <PromocionItem 
                                promocion={promocion.oferton} 
                                observacion={promocion.observacion}
                                imagen={promocion.img}
                                dia={promocion.dia}
                            />
                        </Link>
                    ))}
                </CustomGrid>
            </Stack>
        </GuestLayout>
    )
}
