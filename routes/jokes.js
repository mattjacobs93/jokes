import { Router } from 'express'
import * as jokesCtrl from '../controllers/jokes.js'
const router = Router()


/* GET users listing. */
router.get('/', jokesCtrl.index)
router.get('/new', jokesCtrl.new)
router.get('/:id', jokesCtrl.show)

router.post('/', jokesCtrl.create)
router.post('/:id/comments',jokesCtrl.createComment)

router.delete('/:id', jokesCtrl.delete)

export {
  router
}
