import { Router } from "express";
import { isLoggedIn } from "../middleware/middleware.js";
import * as booksCtrl from '../controllers/books.js'

const router = Router();

router.get('/', booksCtrl.index);


router.post('/', booksCtrl.create)

router.get('/books/:id', booksCtrl.show)

export{
  router,
}

