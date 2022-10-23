import Deshboard from './views/Deshboard.js';
import Posts from './views/Posts.js';
import Settings from './views/Settings.js';


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
    { path: '/settings', view: Settings},
  ];

  // Check for path macth
  const potentialMatchs = routes.map((route) => {
    return {
      route: route,
      isMatch: location.pathname === route.path,
    };
  });

  let match = potentialMatchs.find((matchElement) => matchElement.isMatch);

  // In case we set a wrong url, we'll be redirected to the main page
  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    };
  }


  const view = new match.route.view()

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
