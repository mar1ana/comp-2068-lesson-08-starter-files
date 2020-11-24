const { index, show, create, update, destroy, search } = require('../controllers/people');

module.exports = router => {
  router.get('/people', index);  
  router.get('/people/:id', show);
  router.post('/people', create);
  router.post('/people/update', update);
  router.post('/people/destroy', destroy);
  router.get('/people/search', search);
};
