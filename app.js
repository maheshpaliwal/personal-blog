"use strict";

/**
 * Module dependencies.
 */
const Prismic = require('prismic-javascript');
const PrismicDOM = require('prismic-dom');
const app = require('./config');
const PrismicConfig = require('./prismic-configuration');
const PORT = app.get('port');
const UIhelpers = require('./includes/UIhelpers');
const homeRouter=require('./routes/homeRouter')
const dsAlgoRouter=require('./routes/dsAlgoRouter');
const blogRouter = require('./routes/blogRouter');
const awsRouter=require('./routes/awsRouter')
const dpRouter=require('./routes/dynamicprogramming')
const backtrackingRouter=require('./routes/backtracking');
const arrayRouter=require('./routes/array');

app.listen(3000, () => {
  process.stdout.write(`server at: http://localhost:`);
});

// Middleware to connect to inject prismic context
app.use((req, res, next) => {
  res.locals.ctx = {
    endpoint: PrismicConfig.apiEndpoint,
    linkResolver: PrismicConfig.linkResolver,
  };
  
  // Add UI helpers to access them in templates
  res.locals.UIhelpers = UIhelpers;
  
  // Add PrismicDOM in locals to access them in templates
  res.locals.PrismicDOM = PrismicDOM;
  
  // Add the prismic.io API to the req
  Prismic.api(PrismicConfig.apiEndpoint, {
    accessToken: PrismicConfig.accessToken,
    req,
  }).then((api) => {
    req.prismic = { api };
    next();
  }).catch((error) => {
    next(error.message);
  });
});

/*
 * -------------- Routes --------------
 */

/**
* Preconfigured prismic preview
*/


/**
* Route for blog homepage
*/
app.use('/',homeRouter);
app.use('/ds-algo',dsAlgoRouter);
app.use('/blog',blogRouter);
app.use('/aws',awsRouter);
app.use('/array',arrayRouter);
app.use('/dynamicprogramming',dpRouter);
app.use('/backtracking',backtrackingRouter);
