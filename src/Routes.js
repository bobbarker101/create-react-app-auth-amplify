import React, { Suspense, useState, useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ClimbingBoxLoader } from 'react-spinners';

import { ThemeProvider } from '@material-ui/styles';

import MuiTheme from './theme';

// Layout Blueprints

import {
  LeftSidebar,
  MinimalLayout
  //PresentationLayout
} from './layout-blueprints';

// Example Pages

import Overview from './dashboard-pages/Overview';
import Reports from './dashboard-pages/Reports';
import Keywords from './dashboard-pages/Keywords';
import PageError404 from './dashboard-pages/PageError404';
import SendMessage from './dashboard-pages/SendMessage';
import Senders from './dashboard-pages/Senders';
import Rates from './dashboard-pages/Rates';
import Tnc from './dashboard-pages/Tnc';
//const Homepage = lazy(() => import('./example-pages/Homepage'));

const Routes = (auth) => {
  const location = useLocation();

  const pageVariants = {
    initial: {
      opacity: 0
    },
    in: {
      opacity: 1
    },
    out: {
      opacity: 0
    }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'linear',
    duration: 0.3
  };

  const SuspenseLoading = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
      let timeout = setTimeout(() => setShow(true), 3000);


          return () => {
              clearTimeout(timeout);
          };
    }, []);

    return (
      <>
        <AnimatePresence>
          {show && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}>
              <div className="d-flex align-items-center flex-column vh-100 justify-content-center text-center py-3">
                <div className="d-flex align-items-center flex-column px-4">
                  <ClimbingBoxLoader color={'#3c44b1'} loading={true} />
                </div>
                <div className="text-muted font-size-xl text-center pt-3">
                  Please wait while we load the live preview examples
                  <span className="font-size-lg d-block text-dark">
                    This live preview instance can be slower than a real
                    production build!
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  };

  return (
    <ThemeProvider theme={MuiTheme}>
      <AnimatePresence>
        <Suspense fallback={<SuspenseLoading />}>
          <Switch >
            <Redirect exact from="/" to="/Overview" />
            <Route
              path={[
                  '/Overview',
                  '/Reports',
                  '/SendMessage',
                  '/Keywords',
                  '/Senders',
                  '/Rates',
                  '/Tnc',
              ]}>
              <LeftSidebar>
                <Switch location={location} key={location.pathname}  >
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                      <Route path="/Overview" component={Overview} />
                      <Route path="/Reports" component={Reports} />
                      <Route path="/Keywords" component={Keywords} />
                      <Route path="/SendMessage" component={SendMessage} />
                      <Route path="/Senders" component={Senders} />
                      <Route path="/Rates" component={Rates} />
                      <Route path="/Tnc" component={Tnc} />
                  </motion.div>
                </Switch>
              </LeftSidebar>
            </Route>

            <Route
              path={[
                '/PageError404'
              ]}>
              <MinimalLayout>
                <Switch location={location} key={location.pathname} >
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                    <Route path="/PageError404" component={PageError404} />
                  </motion.div>
                </Switch>
              </MinimalLayout>
            </Route>
          </Switch>
        </Suspense>
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default Routes;
