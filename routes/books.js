import { Router } from "express";
import { isLoggedIn } from "../middleware/middleware.js";
import * as booksCtrl from '../controllers/books.js'

const router = Router();

router.get('/', booksCtrl.index);


router.post('/', booksCtrl.create)

router.get('/:id', booksCtrl.show)

router.get('/:id/edit', booksCtrl.edit)

router.put('/:id', booksCtrl.update)

router.delete('/:id', isLoggedIn, booksCtrl.delete)

export{
  router,
}

