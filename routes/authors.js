import { Router } from "express";
import { isLoggedIn } from "../middleware/middleware.js";
import * as authorsCtrl from '../controllers/authors.js'

const router = Router();

router.get('/', authorsCtrl.index)

router.post('/', isLoggedIn, authorsCtrl.create)
export{
  router
}