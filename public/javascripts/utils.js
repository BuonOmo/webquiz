/**
 * Function for number padding, it add zeros before the string.
 * @param  {object} str An object with a toString() method
 * @param  {number} max
 * @return {string}
 */
function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}

/**
 * Redirect to a page using it’s path, without basename. This function is made
 * for quick change in basename and logic centralisation.
 * @param  {string} path
 * @return {undefined}
 */
function go(path) {
  location = '/'+path;
}
