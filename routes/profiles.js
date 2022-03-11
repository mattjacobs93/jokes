import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'
const router = Router()

router.get('/new', profilesCtrl.new)

router.post('/', profilesCtrl.create)

export {
  router
}
