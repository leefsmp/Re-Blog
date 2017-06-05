import express from 'express';
import Debug from 'debug';

module.exports = function() {

  var router = express.Router();

  var debug = Debug('UserAPI');

  ///////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////
  router.get('/current', (req, res)=> {

    try {

      if (req.user) {

        var user = {
          isAdmin: req.user.isAdmin,
          login: req.user.login,
          name: req.user.name
        };

        return res.json(user);
      }

      res.status(401);
      return res.send('Unauthorized');
    }
    catch(error) {

      debug(error);

      res.status(404);
      res.send('Error');
    }
  });

  return router;
}
