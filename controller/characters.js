import { Character } from '../models/character.js'

function index(req, res) {
  Character.find({})
    .then(characters => {
      res.render('characters/index', {
        characters,
        title: 'characters'
      })
    })
}
function create(req, res) {
  req.body.owner = req.user.profile._id
  console.log(req.body)
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Character.create(req.body)
  .then(character => {
    res.redirect('/characters')
  })
  .catch( err =>{
    console.log(err)
    res.redirect('/characters')
  })
}

function show(req, res) {
  Character.findById(req.params.id)
  .populate('owner')
  .then(character => {
    res.render('characters/show', {
      character,
      title: 'Character Show'
    })
  })
  .catch( err =>{
    console.log(err)
    res.redirect('/characters')
  })
}
export {
  index,
  create,
  show,
}