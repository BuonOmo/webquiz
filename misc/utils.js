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
  }
}
