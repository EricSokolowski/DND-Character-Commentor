import { Character } from '../models/character.js'
import { Profile } from '../models/profile.js'

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
  Character.create(req.body)
  .then(character => {
    Profile.updateOne(
      {_id: req.user.profile._id},
      {$push:{characters: character}}
    )
    .then(() => {
      res.redirect('/characters')
    })
  })
  .catch( err =>{
    console.log(err)
    res.redirect('/characters')
  })
}

function show(req, res) {
  console.log(req.params.id)
  Character.findById(req.params.id)
  .populate([
    {
      path: 'comments',
      populate: {
        path: 'owner'
      }
    },
    {
      path: 'owner',
    }
  ])
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

function edit(req,res) {
  Character.findById(req.params.id)
  .then(character => {
    res.render('characters/edit', {
      character,
      title: 'edit character'
    })
  })
  .catch( err =>{
    console.log(err)
    res.redirect('/characters')
  })
}
function update(req, res) {
  Character.findById(req.params.id)
  .then(character => {
    if (character.owner.equals(req.user.profile._id)) {
      character.updateOne(req.body)
      .then(()=> {
        res.redirect(`/characters/${character._id}`)
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/characters`)
  })
}

function deleteCharacter(req, res) {
  Character.findById(req.params.id)
  .then(character => {
    if (character.owner.equals(req.user.profile._id)) {
      character.delete()
      .then(() => {
        res.redirect('/characters')
      })
    } else {
      throw new Error ('🚫 Not authorized 🚫')
    }   
  })
  .catch(err => {
    console.log(err)
    res.redirect('/characters')
  })
}

function newComment( req, res) {
  // const comment = new Character.comment(req.body)
  // comment
  // .save()
  req.body.owner = req.user.profile._id
  Character.findById(req.params.id)
  .then((character) => {
    character.comments.push(req.body)
    console.log(character)
    character.save()
    .then(() => res.redirect(`/characters/${req.params.id}`))
    .catch((err) => {
      console.log(err)
    })
  })
  .catch((err) => {
    console.log(err)
  })
}
export {
  index,
  create,
  show,
  edit,
  update,
  deleteCharacter as delete,
  newComment,
}