import express from 'express'
import userRoutes from './user.routes'
import financeRoutes from './fincance.routes'

const router = express.Router()

router.get('/healthcheck', (_, res) => res.sendStatus(200))

router.use('/user', userRoutes)
router.use('/finance', financeRoutes)

export default router
