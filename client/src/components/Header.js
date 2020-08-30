import React, { useState } from 'react'
import { Box, Heading, Flex, Text } from '@chakra-ui/core'
import { useCookies } from 'react-cookie'
import { Link, useLocation } from 'react-router-dom'
import propTypes from 'prop-types'

export default props => {
    const [show, setShow] = useState(false)
    const { pathname: currentLocation } = useLocation()
    const [cookies, setCookies, removeCookies] = useCookies(['token'])
    const [token] = useState(cookies.token)
    const handleToggle = () => setShow(!show)

    const MenuItems = ({ text, href, currentPage, logout }) => (
        <Text
            as={Link}
            to={href}
            mt={{ base: 4, md: 0 }}
            mr={6}
            fontWeight={currentPage ? 'bolder' : 'medium'}
            fontSize={currentPage ? 'md' : 'sm'}

            display="block"
            float="left"
            textAlign="center"
            
            onClick={() => {
                if (logout) {
                    removeCookies('token')
                    window.location.href = '/login'
                }
            }}
        >
            {text}
        </Text>
    )

    MenuItems.propTypes = {
        logout: propTypes.bool,
        href: propTypes.string,
        text: propTypes.string,
        currentPage: propTypes.bool,
    }

    return (
        <Flex bg="grey.900" w="100%" justifyContent="center">
            <Flex
                w={{ base: '100%', lg: '1024px', xl: '1440px' }}
                as="nav"
                padding="1.5rem"
                align="center"
                justifyContent="space-between"
                wrap="wrap"
                color="white"
                overflow="hidden"
                {...props}
            >
                <Flex align="center" mr={5}>
                    <Heading as="h1" size="lg" letterSpacing={'-0.1rem'}>
                        <Link to="/">Erácleo's PIZZA</Link>
                    </Heading>
                </Flex>

                <Box display={{ sm: 'block', md: 'none' }} onClick={handleToggle}>
                    <svg fill="white" width="12px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </Box>

                <Box
                    display={{ base: show ? 'block' : 'none', md: 'flex' }}
                    width={{ sm: 'full', md: 'auto' }}
                    position={{ base: 'relative', md: 'initial' }}
                    alignItems="center"
                    flexGrow={1}
                >
                    {token && (
                        <MenuItems
                            href="/dashboard"
                            currentPage={currentLocation.split('/').includes('dashboard')}
                            text="Dashboard"
                        />
                    )}
                    {token && (
                        <MenuItems
                            href="/registrar"
                            currentPage={currentLocation.split('/').includes('registrar')}
                            text="Registrar"
                        />
                    )}
                    {token && (
                        <MenuItems
                            href="/form"
                            currentPage={currentLocation.split('/').includes('form')}
                            text="Formulario"
                        />
                    )}
                    {!token && (
                        <MenuItems
                            href="/login"
                            currentPage={currentLocation.split('/').includes('login')}
                            text="Entrar"
                        />
                    )}
                    {token && <MenuItems href="/login" text="Salir" logout />}
                </Box>
            </Flex>
        </Flex>
    )
}
