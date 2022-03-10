import { Router } from 'express'
import * as jokesCtrl from '../controllers/jokes.js'
const router = Router()


/* GET users listing. */
router.get('/', jokesCtrl.index)
router.get('/new', jokesCtrl.new)

router.post('/', jokesCtrl.create)

export {
  router
}
