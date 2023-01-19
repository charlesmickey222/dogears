import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

router.get('/:id', isLoggedIn, profilesCtrl.show)

router.post('/:id/library/:id', isLoggedIn, profilesCtrl.saveBook)

router.get('/:id/dogears', isLoggedIn, profilesCtrl.newDogear)

router.post(':id/dogears', isLoggedIn)

export {
  router
}