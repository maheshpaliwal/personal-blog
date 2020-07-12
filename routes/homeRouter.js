const express = require('express');
const cors = require('cors');
const homeRouter = express.Router();
const Prismic = require('prismic-javascript');
const PrismicDOM = require('prismic-dom');
const app = require('../config');
const PrismicConfig = require('../prismic-configuration');
const PORT = app.get('port');
const UIhelpers = require('../includes/UIhelpers');
homeRouter.use(cors())

homeRouter.route('/')
    .all((req, res, next) => {
      next();
    })
    .get((req, res) => {
        req.prismic.api.getSingle("blog_home").then((bloghome) => {
    
            // If a document is returned...
            if (bloghome) {
        
              var queryOptions = {
                page: req.params.p || '1',
                orderings: '[my.post.date desc]'
              };
        
              // Query the posts
              req.prismic.api.query(
                Prismic.Predicates.at("document.type", "post"),
                queryOptions
              ).then(function(response) {
                //console.log(response);
                // Render the blog homepage
                res.render('bloghome', {
                  bloghome,
                  posts : response.results
                });
              });
        
            } else {
              // If a bloghome document is not returned, display the 404 page
              res.status(404).render('404');
            }
          })
        
    })
    .post((req, res) => {
        res.status(404).render('404');
       
    })
    .put((req, res) => {
        res.status(404).render('404');
    })
    .delete((req, res) => {
        res.status(404).render('404');
    })

module.exports = homeRouter