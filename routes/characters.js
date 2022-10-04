import {  Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as charactersCtrl from '../controller/characters.js'

const router = Router()

router.get('/', charactersCtrl.index)

router.get('/:id', charactersCtrl.show)

router.get('/:id/edit', isLoggedIn, charactersCtrl.edit)

router.post('/', isLoggedIn, charactersCtrl.create)

export {
  router
}