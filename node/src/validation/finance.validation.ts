import _ from 'lodash'
import z, { nativeEnum, object, string, number, date, preprocess } from 'zod'
import { CostsType, FinanceType } from '../models/finance.mode'
import UserModel from '../models/user.model'

const financeType = nativeEnum(FinanceType)
const dateType = preprocess((arg) => {
  if (typeof arg == 'string' || arg instanceof Date) return new Date(arg)
}, date())

const amountType = number().min(1).max(Number.MAX_SAFE_INTEGER)
const userType = string()
const costsType = nativeEnum(CostsType)

const example = object({
  body: object({}),
})
export const createPlusFinanceValidation = object({
  body: object({
    date: dateType,
    amount: amountType,
    user: userType,
  }).refine(
    async (data) => await UserModel.findById(data.user).select('').lean(),
    {
      message: 'User with that id does not exists',
      path: ['user'],
    }
  ),
})

export const createMinusFinanceValidation = object({
  body: object({
    date: dateType,
    amount: amountType,
    user: userType,
    costsType: costsType,
  }).refine(
    async (data) => await UserModel.findById(data.user).select('').lean(),
    {
      message: 'User with that id does not exists',
      path: ['user'],
    }
  ),
})

export type CreatePlusFinanceInput = z.infer<
  typeof createPlusFinanceValidation
>['body']
export type CreateMinusFinanceInput = z.infer<
  typeof createMinusFinanceValidation
>['body']
