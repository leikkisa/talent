import { renderToString } from 'react-dom/server'
import React from 'react'
const router = require('express').Router()
import { match } from 'react-router'
import { matchPath, StaticRouter, RouterContext } from 'react-router-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise'
import reducers from '../../shared/reducers'

const path = require('path')

import routes from '../../shared/routes'
import renderFullPage from '../renderFullPage'
// import App from '../../shared/components/app'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

router.use('*', (req, res) => {
  match({ routes: routes, location: req.originalUrl}, (err, redirectLocation, renderProps) => {
    console.log( 'renderProps::', renderProps )
    if (err) {
      return res.status(500).send(err.message);
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }


  })
  // matchPath(req.originalUrl, { path: route, exact: true})

  var markup

  const context = {}
  if (renderProps) {
      markup = renderToString(
          <Provider store={createStoreWithMiddleware(reducers)}>
             { <RouterContext {...renderProps} />}
             <StaticRouter context={context} location={req.originalUrl} />
          </Provider>
      )
  }

  // var html
  // if (renderProps) {
  //   html = renderToString(
  //     <Provider store={createStoreWithMiddleware(reducers)}>
  //     // <StaticRouter context={context} location={req.originalUrl} />
  //     { <RouterContext {...renderProps} />}
  //     </Provider>
  //   )
  // }

  return res.render('index', { markup });
})

module.exports = router
