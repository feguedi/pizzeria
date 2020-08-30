import React, { useState, useEffect, useContext } from 'react'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { useColorMode, useTheme } from '@chakra-ui/core'
// import AuthApi from './utils/auth'
import HomeComponent from './views/Home'
import ProfileComponent from './views/Profile'
import OrderComponent from './views/Order'
import AnOrderComponent from './views/AnOrder'
import OfferComponent from './views/Offers'
import AnOfferComponent from './views/Offers'
import CheckoutComponent from './views/Checkout'
import SandboxComponent from './views/Sandbox'
import ErrorComponent from './views/Error404'

export default () => {
    const [browserHistory] = useState(createBrowserHistory())
    // const Auth = useContext(AuthApi)
    const theme = useTheme()
    const { colorMode, toggleColorMode } = useColorMode()

    useEffect(() => {
        if (colorMode === 'light') {
            toggleColorMode()
        }
        console.log('fontsize:', theme.fonts)
    })

    // const ProtectedRoute = ({ auth, component: Component, path, altRoute, ...rest }) => (
    //     <Route {...rest} path={path} render={() => (!auth ? <Component /> : <Redirect to={altRoute} />)} />
    // )

    return (
        <Router history={browserHistory}>
            <Switch>
                <Route path="/" component={HomeComponent} exact />
                <Route path="/profile" component={ProfileComponent} exact />
                <Route path="/order" component={OrderComponent} exact />
                <Route path="/orders/:id" component={AnOrderComponent} />
                <Route path="/offers" component={OfferComponent} exact/>
                <Route path="/offers/:id" component={AnOfferComponent} />
                <Route path="/checkout" component={CheckoutComponent} exact />
                <Route path="/sandbox" component={SandboxComponent} exact />
                <Route path="/error" component={ErrorComponent} />
                <Redirect from="*" to="/error" />
            </Switch>
        </Router>
    )
}
