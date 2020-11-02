const db = require('../data/db-config')

function find(table) {
  return db(table) 
}
    
function findById(id,table) {
  return db(table).where({ id }).first() 
}
function findBy(filter) {
  return db(users).where(filter).orderBy(id); 
}

function addUser(user, table) {
  await db(table).insert(user);
  return db('users').where({ username: user.username})
}
function add(addedObject, table) { 
  const newCar = addedObject
  const id = await db('inventory').insert( owner, year, make, model, carclass, trim, vin, mileage, price, sold)
  db('details').insert( vin, description, fuel, engine, transmission, driveTrain, a/c, audio, color )
  
  return "Car Added"
}
function update(changes, id, table) {
  return db(table) 
  .update(changes)
  .where({ id })
  .then( () => {
      return findById(id, table)
  })
}
function remove(id, table) {
  let removed
  findById(id, table).then(rez => removed=rez)
  return db(table) 
    .where({ id })
    .del()
    .then(() => {
      return removed
    })
}
module.exports ={
  find,
  findById,
  findBy,
  addUser,
  add,
  update,
  remove
}