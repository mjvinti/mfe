import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';

import Header from './components/Header';
import Progress from './components/Progress';

const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));
const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const generateClassName = createGenerateClassName({ productionPrefix: 'co' });
const history = createBrowserHistory();

const App = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        if (isSignedIn) {
            history.push('/dashboard');
        }
    }, [isSignedIn])


    return (
        <StylesProvider generateClassName={generateClassName}>
            <Router history={history}>
                <div>
                    <Header
                        onSignOut={() => setIsSignedIn(false)}
                        isSignedIn={isSignedIn}
                    />
                    <Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path='/auth'>
                                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
                            </Route>
                            <Route path='/dashboard'>
                                {!isSignedIn && <Redirect to='/' />}
                                <DashboardLazy />
                            </Route>
                            <Route path='/' component={MarketingLazy} />
                        </Switch>
                    </Suspense>
                </div>
            </Router>
        </StylesProvider>
    )
}

export default App;