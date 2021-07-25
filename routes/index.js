const express = require("express");
const app = express();
const router = express.Router();
const io = require("../bin/www");

router.get("/routes", (req, res, next) => {
  var routes = [];
  var i = 0;
  router.stack.forEach(function (r) {
    if (r.route && r.route.path) {
      r.route.stack.forEach(function (type) {
        var method = type.method.toUpperCase();
        routes[i++] = {
          no: i,
          method: method.toUpperCase(),
          path: r.route.path,
        };
      });
    }
  });

  res.send("<h1>List of routes.</h1>" + JSON.stringify(routes));
});

require("./user")(router);

module.exports = router;
