import Deshboard from './views/Deshboard.js';
import Posts from './views/Posts.js';
import PostsView from './views/PostsView.js';
import Settings from './views/Settings.js';



// Check a url path to replace farword single slashes using "Regular Expresion"
const pathToRegex = path => new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$')

// Get 'match' to determine the key and value of 'router'
const getParams = match => {
    const values = match.result.slice(1)
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1])

    return Object.fromEntries(keys.map((key, id) => {
      return [key, values[id]]}))
}

// Get current url from the browser history
const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

// A func provides logic in paths interactions
const router = async () => {
  const routes = [
    { path: '/', view: Deshboard },
    { path: '/posts', view: Posts},
    { path: '/posts/:id', view: PostsView},
    { path: '/settings', view: Settings},
  ];

  // Check for path macth
  const potentialMatchs = routes.map((route) => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path))
    };
  });

  // Make a boolin
  let match = potentialMatchs.find((matchElement) => matchElement.result !== null);

  // In case we set a wrong url, we'll be redirected to the main page
  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname]
    };
  }

  const view = new match.route.view(getParams(match))

  document.querySelector('#app').innerHTML = await view.getHTML()

};

window.addEventListener('popstate', router)

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', e => {
        if (e.target.matches('[data-link]')) {
            e.preventDefault()
            navigateTo(e.target.href)
        }
    })
  router();
});
