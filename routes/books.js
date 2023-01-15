import { Router } from "express";
import { isLoggedIn } from "../middleware/middleware.js";
import * as booksCtrl from '../controllers/books.js'

const router = Router();

router.get('/', booksCtrl.index);

router.get('/new', booksCtrl.new)

router.post('/', booksCtrl.create)

export{
  router,
}

