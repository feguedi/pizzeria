import React from 'react'
import { Flex, Stack, Heading, Text } from '@chakra-ui/core'

export default ({ imagen, promocion, dia, observacion }) => (
    <Stack spacing={2}>
        <Flex
            h="200px"
            w="200px"
            backgroundColor="#000000"
            backgroundImage={imagen}
            borderRadius="25"
            boxShadow="0 0 10px #777777"
        >
            <Heading as="h4" fontSize="md" color="grey.50">{promocion}</Heading>
            <Text>{observacion || ''}</Text>
        </Flex>
        <Heading>{dia}</Heading>
    </Stack>
)
