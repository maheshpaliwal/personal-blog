## Personal blog with prismic cms

it is a blog template with content managed in prismic.io (an API-based CMS).

#### Getting started

Read [this guide](https://intercom.help/prismicio/examples/nodejs-samples/sample-blog-with-api-based-cms-in-nodejs) for instructions to create your repository and use the sample blog.

#### Deploy your Node.js blog

An easy way to deploy your Node.js blog is to use [Heroku](http://www.heroku.com). Just follow these few simple steps once you have successfully [signed up](https://id.heroku.com/signup/www-header) and [installed the Heroku toolbelt](https://toolbelt.heroku.com/):

Create a new Heroku application

```
$ heroku create
```

Initialize a new Git repository:

```
$ git init
$ heroku git:remote -a your-heroku-app-name
```

Commit your code to the Git repository and deploy it to Heroku:

```
$ git add .
$ git commit -am "make it better"
$ git push heroku master

