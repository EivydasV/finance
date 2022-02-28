import { paginate } from 'mongoose-paginate-v2'
import {
  CreatePlusFinanceInput,
  CreateMinusFinanceInput,
  GetMyFinanceValidation,
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
  const { date, amount } = req.body

  const createFinance = await FinanceModel.create({
    date,
    amount,
    type: FinanceType.PLUS,
    user: res.locals.user._id,
  })

  return res.status(201).json({ finance: createFinance })
}

export const createMinusFinanceHandler: RequestHandler<
  {},
  {},
  CreateMinusFinanceInput
> = async (req, res, next) => {
  const { date, amount, costsType } = req.body

  const createFinance = await FinanceModel.create({
    date,
    amount,
    type: FinanceType.MINUS,
    user: res.locals.user._id,
    costsType,
  })

  return res.status(201).json({ finance: createFinance })
}

export const getMyFinanceHandler: RequestHandler<
  {},
  {},
  GetMyFinanceValidation
> = async (req, res, next) => {
  const date = moment(req.body.date || Date.now())
  // db.collection.aggregate([{
  //   $group :
  //         {
  //           _id : "$language",
  //           totalSaleAmount: { $sum:  "$population" },
  //           count: {$count: {}}
  //         }
  // }])
  const myFinances = await FinanceModel.find({
    user: res.locals.user._id,
    date: { $gt: date.startOf('month'), $lt: date.endOf('month') },
  })
  if (myFinances) return next(new createError.NotFound())

  return res.status(200).json({ finances: myFinances })
}
