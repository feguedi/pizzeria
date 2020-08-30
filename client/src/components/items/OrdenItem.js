import React from 'react'
import { Flex, Box, Image, Text } from '@chakra-ui/core'

export default ({ tamano, distribucion }) => {
    const { parte, especialidad} = distribucion

    return (
        <Box>
            <Flex>
                <Image rounded="xl" src="" fallbackSrc="" />
                <Text></Text>
            </Flex>
            <Flex align="baseline" mt={2}>

            </Flex>
        </Box>
    )
}
