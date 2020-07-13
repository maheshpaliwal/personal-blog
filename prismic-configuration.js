module.exports = {

  apiEndpoint: 'https://blogmappie.prismic.io/api/v2',
  linkResolver(doc,router) {
    if (doc.type == 'blog_home') {
      return '/blog';
    }
    if (doc.type == 'post' && router=='blog') {
      return '/blog/' + encodeURIComponent(doc.uid);
    }
    else if (doc.type == 'post' && router=='ds') {
      return '/ds-algo/' + encodeURIComponent(doc.uid);
    }
    else if(doc.type=='post'&&router=='aws'){
      return '/aws/' + encodeURIComponent(doc.uid);

    }
    return '/';
  }
  
};
