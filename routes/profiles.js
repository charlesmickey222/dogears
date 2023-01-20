import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

router.get('/:id', isLoggedIn, profilesCtrl.show)

router.post('/:id/library/:id', isLoggedIn, profilesCtrl.saveBook)

router.get('/:id/dogears', isLoggedIn, profilesCtrl.newDogear)

router.post('/:id/dogears', isLoggedIn, profilesCtrl.createDogear)

router.get('/:id/dogears/:id', isLoggedIn, profilesCtrl.editDogear)

router.put('/:id/dogears/:id', isLoggedIn, profilesCtrl.updateDogear)

router.delete('/:id/dogears/:id', isLoggedIn, profilesCtrl.deleteDogear)

router.delete('/:id/library/:id', isLoggedIn, profilesCtrl.tossBook)

export {
  router
}