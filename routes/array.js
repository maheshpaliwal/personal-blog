const express = require('express');
const cors = require('cors');
const arrayRouter = express.Router();
const Prismic = require('prismic-javascript');
const PrismicDOM = require('prismic-dom');
const app = require('../config');
const PrismicConfig = require('../prismic-configuration');
const PORT = app.get('port');
const UIhelpers = require('../includes/UIhelpers');
arrayRouter.use(cors())
arrayRouter.route('/')
    .all((req, res, next) => {
      next();
    })
    .get((req, res) => {
        req.prismic.api.getSingle("blog_home").then((bloghome) => {
            if (bloghome) {
        
              var queryOptions = {
                page: req.params.p || '1',
                orderings: '[my.post.date desc]'
              };
        
              // Query the posts using ds-algo tag
              req.prismic.api.query(
                [Prismic.Predicates.at("document.type", "post"),
                Prismic.Predicates.any('document.tags', ['array'])
              ],
                queryOptions
              ).then(function(response) {
                    console.log(response);    
                res.render('dsalgohome', {
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
    arrayRouter.route('/:uid')
    .all((req, res, next) => {
      next();
    })
    .get((req, res) => {
       // Define the uid from the url
  const uid = req.params.uid;
  // Query the post by its uid
  req.prismic.api.getByUID('post', uid).then(post => {

    if (post) {
      // If a document is returned, render the post
      res.render('post', { post });
      
    // Else display the 404 page
    } else {
      res.status(404).render('404');
    }
  });
        
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

module.exports = arrayRouter