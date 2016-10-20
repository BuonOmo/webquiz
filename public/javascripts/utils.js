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
 * Remove an item from sessionStorage. This page will redirect user if browser
 * hasn’t got sessionStorage.
 * @param  string    name name of the item
 * @return undefined
 */
function removeSession(name) {
  if (Modernizr.sessionstorage) {
    sessionStorage.removeItem('WQ_'+name);
  } else {
    go('ie');
  }
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
 * Remove an item from localStorage. This page will redirect user if browser
 * hasn’t got localStorage.
 * @param  string    name name of the item
 * @return undefined
 */
function removeLocal(name) {
  if (Modernizr.localstorage) {
    localStorage.removeItem('WQ_'+name);
  } else {
    go('ie');
  }
}

/**
 * Remove every variable in namespace WQ from localStorage and sessionStorage.
 * This function is used for test purpuse.
 * @return undefined
 */
function removeAllStorage() {
  Object.keys(sessionStorage)
    .filter(function(key) { return key.startsWith('WQ_') })
    .forEach(function(key){ sessionStorage.removeItem(key); });
  Object.keys(localStorage)
    .filter(function(key) { return key.startsWith('WQ_') })
    .forEach(function(key) { localStorage.removeItem(key); });
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
