/**
 * Put an item in sessionStorage. This page will redirect user if browser hasn’t
 * got sessionStorage.
 * @param  object item
 * @return boolean
 */
function setSession(name, item) {
  var ret;
  if (ret = Modernizr.sessionstorage) {
    sessionStorage.setItem('WQ_'+name, JSON.stringify(item));
  } else {
    go('ie');
  }
  return ret;
}

/**
 * Get an item from sessionStorage. This page will redirect user if browser
 * hasn’t got sessionStorage.
 * @param  string name name of the item
 * @return object      corresponding item
 */
function getSession(name) {
  if (Modernizr.sessionstorage) {
    return JSON.parse(sessionStorage.getItem('WQ_'+name));
  }
  go('ie');
  return null;
}

/**
 * Put an item in localStorage. This page will redirect user if browser hasn’t
 * got localStorage.
 * @param  object item
 * @return boolean
 */
function setLocal(name, item) {
  var ret;
  if (ret = Modernizr.localstorage) {
    localStorage.setItem('WQ_'+name, JSON.stringify(item));
  } else {
    go('ie');
  }
  return ret;
}

/**
 * Get an item from localStorage. This page will redirect user if browser hasn’t
 * got localStorage.
 * @param  string name name of the item
 * @return object      corresponding item
 */
function getLocal(name) {
  if (Modernizr.localstorage) {
    return JSON.parse(localStorage.getItem('WQ_'+name));
  }
  go('ie');
  return null;
}

/**
 * Redirect to a page using it’s path, without basename. This function is made
 * for quick change in basename and logic centralisation.
 * @param  string    path
 * @return undefined
 */
function go(path) {
  location = '/'+path;
}
