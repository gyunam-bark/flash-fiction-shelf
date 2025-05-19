import { Router } from 'express'
import NovelController from '../controllers/novel.controller.mjs'

const router = Router()
const controller = new NovelController()

// /
router.post('/', controller.create)
router.get('/', controller.getBySeries)
// /ref
router.get('/ref', controller.getByReference)
// /all
router.get('/all', controller.getAll)
// /:id
router.get('/:id', controller.get)
router.put('/:id', controller.update)
router.patch('/:id/deactivate', controller.deactivate)

export default router