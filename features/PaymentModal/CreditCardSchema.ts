import { z } from 'zod'
import isCreditCard from 'validator/lib/isCreditCard'
import { safeParseInt } from '@/lib/utils'
import { isValidDate, parseCardExpDate } from './utils'

export const cardNumberSchema = z.preprocess(
  (val) => safeParseInt(val).toString(),
  z.string({
    required_error: 'El número de tarjeta es requerido'
  }).refine((cardNumber) => isCreditCard(cardNumber), {
    message: 'El número de tarjeta es inválido'
  })
)

export const cardNameSchema = z
  .string({ required_error: 'El nombre del titular es requerido' })
  .min(3, { message: 'El nombre del titular debe tener al menos 3 caracteres' })

export const cardExpirationSchema = z.custom<string>((val: unknown) => {
  if (typeof val !== 'string') return false
  return isValidDate(parseCardExpDate(val).toLocaleString())
}, {
  message: 'La fecha de expiración es inválida'
})

export const cardCvcSchema = z
  .string({ required_error: 'El código de seguridad es requerido' })
  .min(3, { message: 'El código de seguridad debe tener al menos 3 dígitos' })

export const CreditCardSchema = z.object({
  cardNumber: cardNumberSchema,
  cardName: cardNameSchema,
  cardExpiration: cardExpirationSchema,
  cardCvc: cardCvcSchema
})