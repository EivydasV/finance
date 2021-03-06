import {
  getModelForClass,
  ModelOptions,
  Prop,
  Pre,
  Ref,
} from '@typegoose/typegoose'
import validator from 'validator'
import argon2 from 'argon2'
import FinanceModel from './finance.mode'
import PaginatedModel from '../helpers/paginatedModel'
@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
class Recommendations {
  @Prop({ ref: () => User })
  writtenBy!: Ref<User>

  @Prop({ required: true })
  message!: string
}
export enum Roles {
  USER = 'user',
  ADMIN = 'admin',
}

@Pre<User>('save', async function (next) {
  if (!this.isModified('password')) return next()

  const hash = await argon2.hash(this.password)
  this.password = hash
  next()
})
@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class User extends PaginatedModel {
  @Prop({
    lowercase: true,
    trim: true,
    required: true,
    unique: true,
    maxlength: 50,
    validate: [validator.isEmail, 'Please provide valid email'],
  })
  email!: string

  @Prop({ trim: true, required: true, maxlength: 50 })
  firstName!: string

  @Prop({ trim: true, required: true, maxlength: 50 })
  lastName!: string

  @Prop({ type: [String], enum: Roles, required: true, default: Roles.USER })
  roles!: Roles[]

  @Prop({
    required: true,
    maxlength: 200,
    select: false,
    validate: {
      validator: (password: string) =>
        validator.isStrongPassword(password, { minSymbols: 0 }),
      message: (props) =>
        `${props.path}  must contain at least one upperCase, one lowerCase, one number and total length must be more than 8 characters long`,
    },
  })
  password!: string

  @Prop({ select: false })
  passwordResetToken?: string

  @Prop({ select: false })
  passwordResetTokenExpires?: Date

  async comparePassword(candidatePassword: string) {
    return await argon2.verify(this.password, candidatePassword)
  }
}

const UserModel = getModelForClass(User)
export default UserModel
