import { getModelForClass, Plugins, Prop, Ref } from '@typegoose/typegoose'
import moment from 'moment'
import { User } from './user.model'
import mongoosePaginate from 'mongoose-paginate-v2'
import PaginatedModel from '../helpers/paginatedModel'

export enum FinanceType {
  PLUS = 'plus',
  MINUS = 'minus',
}
export enum CostsType {
  FOOD = 'food',
  BEAUTY = 'beauty',
  CULTURE = 'culture',
  HEALTH = 'health',
  GIFT = 'gift',
  TRANSPORTATION = 'transportation',
  EDUCATION = 'education',
  HOUSEHOLD = 'household',
  APPAREL = 'apparel',
  OTHER = 'other',
}
export class Finance {
  @Prop({ required: true, enum: FinanceType })
  type!: FinanceType

  @Prop({
    immutable: function () {
      return this.type !== FinanceType.MINUS
    },
    required: function () {
      return this.type === FinanceType.MINUS
    },
    enum: CostsType,
  })
  costsType!: CostsType

  @Prop({
    required: true,
    set: (val: Date) => moment(val).startOf('day').toDate(),
    get: (val: Date) => moment(val).format('L'),
  })
  date!: Date

  @Prop({ required: true, min: 1, max: Number.MAX_SAFE_INTEGER })
  amount!: number

  @Prop({ required: true, ref: () => User })
  user!: Ref<User>
}

const FinanceModel = getModelForClass(Finance)
export default FinanceModel
