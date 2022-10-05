import {  Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as charactersCtrl from '../controllers/characters.js'

const router = Router()

router.get('/', charactersCtrl.index)

router.get('/:id', charactersCtrl.show)

router.get('/:id/edit', isLoggedIn, charactersCtrl.edit)

router.get('/')

router.put('/:id', isLoggedIn, charactersCtrl.update)

router.post('/:id/comments', isLoggedIn, charactersCtrl.newComment)

router.post('/', isLoggedIn, charactersCtrl.create)

router.delete('/:id', isLoggedIn, charactersCtrl.delete)

export {
  router
}