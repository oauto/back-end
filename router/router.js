const router = require('express').Router()
const helper= require('./helper') 
// const restricted = require('../auth/restricted-middleware')

// get inventory
router.get('/', (req, res) => {
  const {username} = req.jwt
  helper.find({username})
  .then(rez => res.status(200).json(rez))
  .catch(err => res.status(500).json({status: 500, err}))
})

// get inventory by car
router.get('/:id', (req, res) => {
  helper.find('TABLE')
  .then(rez => res.status(200).json(rez))
  .catch(err => res.status(500).json({status: 500, err}))
})

// add inventory
router.post('/', (req, res) => {
  helper.add(req.body, 'TABLE')
  .then(rez => res.status(200).json(rez))
  .catch(err => res.status(500).json({status: 500, err}))
})

// edit inventory
router.put('/:id', (req, res) => {
  const id = req.params.id
  helper.update(req.body, id, 'TABLE')
  .then(rez => res.status(200).json(rez))
  .catch(err => res.status(500).json({status: 500, err}))
})

// remove inventory
router.delete('/:id', (req, res) => {
  const id = req.params.id
  helper.remove(id, 'TABLE')
  .then(rez => res.status(200).json(rez))
  .catch(err => res.status(500).json({status: 500, err}))
})

function checkRole(role) {
  return (req, res, next) => {
    if (req.jwt.role === role) {
      next();
    } else {
      res.status(403).json({ message: 'You are not authorized' });
    }
  }
}
module.exports = router