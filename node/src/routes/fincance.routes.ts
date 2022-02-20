import express from 'express'
import validateResource from '../middlewares/validateResource'
import requireUser from '../middlewares/requireUser'
import requireRoles from '../middlewares/requireRoles'
import {
  createPlusFinanceHandler,
  getMyFinanceHandler,
  createMinusFinanceHandler,
} from '../controllers/finance.controller'
import { Roles } from '../models/user.model'
import {
  createPlusFinanceValidation,
  createMinusFinanceValidation,
} from '../validation/finance.validation'

const router = express.Router()

router.use(requireUser, requireRoles(Roles.USER))

router.post(
  '/create-plus',
  validateResource(createPlusFinanceValidation),
  createPlusFinanceHandler
)
router.post(
  '/create-minus',
  validateResource(createMinusFinanceValidation),
  createMinusFinanceHandler
)
router.route('/').get(getMyFinanceHandler)
export default router
