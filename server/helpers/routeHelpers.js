function isActiveRoute(route, currentRoute) {  // need two parameters for this helper function
  return route === currentRoute ? 'active' : '';
}

module.exports = { isActiveRoute: isActiveRoute }; // export the helper function