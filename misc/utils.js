module.exports = {
  databaseError: (req,res) => {
    return (data) => {
      res.status(500);
      res.json({
        error: "DB: error retrieving results",
        params: req.params,
        data: data
      });
    }
  },
  jqueryFix: (toParse) => {
    /* HACK: this is an ugly fix for a converting issue from jquery. If we sent
     * the data as a js object, the conversion to json went poorly on numbers and
     * objects. There should be a proper way to do so, however this wont be fix
     * because it is a jquery issue, out of our context.
     */
    try {
      return JSON.parse(Object.keys(toParse)[0]);
    } catch (e) {
      return toParse;
    }
  }
}
