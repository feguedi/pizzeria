import React, { useState } from 'react'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import HomeComponent from './views/Home'
import ErrorComponent from './views/Error'

export default () => {
    const [browserHistory] = useState(createBrowserHistory())

    return (
        <Router history={browserHistory}>
            <Switch>
                <Route path="/" component={HomeComponent} exact />
                <Route path="/error" component={ErrorComponent} />
                <Redirect from="*" to="/error" />
            </Switch>
        </Router>
    )
}
