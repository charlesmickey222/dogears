import { Router } from "express";
import { isLoggedIn } from "../middleware/middleware.js";
import { updateBooks } from "../middleware/middleware.js";
import * as authorsCtrl from '../controllers/authors.js'

const router = Router();

router.get('/', authorsCtrl.index)

router.post('/', authorsCtrl.create, updateBooks)

router.get('/:id', authorsCtrl.show)

router.get('/:id/edit', authorsCtrl.edit)

router.put('/:id', authorsCtrl.update)

router.delete('/:id', isLoggedIn, authorsCtrl.delete)


export{
  router
}