var environment = process.env.NODE_ENV;

var url = environment === "production" ?
  'mongodb://root:w3bQu1z@ds031257.mlab.com:31257/webquiz' :
  'mongodb://root:w3bQu1z@ds145997.mlab.com:45997/webquiz-test';


module.exports = {
  database: {
    url: url
  }
}
