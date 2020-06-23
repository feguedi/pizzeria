import React from 'react'
import { CookiesProvider } from 'react-cookie'
import { ThemeProvider, ColorModeProvider, CSSReset } from '@chakra-ui/core'
import Theme from './theme'
import Routes from './Routes'

function App() {
    return (
        <CookiesProvider>
            <ThemeProvider theme={Theme}>
                <CSSReset />
                <ColorModeProvider>
                    <Routes />
                </ColorModeProvider>
            </ThemeProvider>
        </CookiesProvider>
    )
}

export default App
