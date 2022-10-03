import {  Router } from 'express'
import * as charactersCtrl from '../controller/characters.js'

const router = Router()

router.get('/', charactersCtrl.index)

export {
  router
}