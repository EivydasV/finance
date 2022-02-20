import { paginate } from 'mongoose-paginate-v2'
import {
  CreatePlusFinanceInput,
  CreateMinusFinanceInput,
} from './../validation/finance.validation'
import { RequestHandler } from 'express'
import createError from 'http-errors'
import FinanceModel, { FinanceType } from '../models/finance.mode'
import moment from 'moment'

export const createPlusFinanceHandler: RequestHandler<
  {},
  {},
  CreatePlusFinanceInput
> = async (req, res, next) => {
  const { date, amount, user } = req.body

  const createFinance = await FinanceModel.create({
    date,
    amount,
    type: FinanceType.PLUS,
    user,
  })

  return res.status(201).json({ finance: createFinance })
}

export const createMinusFinanceHandler: RequestHandler<
  {},
  {},
  CreateMinusFinanceInput
> = async (req, res, next) => {
  const { date, amount, user, costsType } = req.body

  const createFinance = await FinanceModel.create({
    date,
    amount,
    type: FinanceType.MINUS,
    user,
    costsType,
  })

  return res.status(201).json({ finance: createFinance })
}

export const getMyFinanceHandler: RequestHandler = async (req, res, next) => {
  //   const myFinances = await FinanceModel.find({})
  const myFinances = await FinanceModel.paginate(
    {
      user: res.locals.user._id,
    },
    { lean: true, limit: 10, page: 1 }
  )
  if (myFinances.docs.length === 0) return next(new createError.NotFound())

  return res.status(200).json({ finances: myFinances })
}
