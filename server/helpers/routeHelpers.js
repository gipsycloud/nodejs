function isActiveRoute(route, curretRoute) {  // need two parameters for this helper function
  return route === curretRoute ? 'active' : '';
}

module.exports = { isActiveRoute: isActiveRoute }; // export the helper function