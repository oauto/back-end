const router = require('express').Router()
const helper= require('./helper') 
// const restricted = require('../auth/restricted-middleware')

// get logged in user
router.get('/user', (req, res) => {
  const {username} = req.jwt
  helper.find({username})
  .then(rez => res.status(200).json(rez))
  .catch(err => res.status(500).json({status: 500, err}))
})

// get inventory
router.get('/inventory', (req, res) => {
  const id = req.params.id
  helper.find(id, 'TABLE')
  .then(rez => res.status(200).json(rez))
  .catch(err => res.status(500).json({status: 500, err}))
})

// add inventory
router.post('/inventory', (req, res) => {
  helper.add(req.body, 'TABLE')
  .then(rez => res.status(200).json(rez))
  .catch(err => res.status(500).json({status: 500, err}))
})

// edit inventory
router.put('/inventory/:id', (req, res) => {
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