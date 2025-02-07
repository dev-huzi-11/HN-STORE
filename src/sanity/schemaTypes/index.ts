import { type SchemaTypeDefinition } from 'sanity'
import { product } from './productSchema'
import { orderDetail } from './orderDetail'
import { reviews } from './review'
import { dressStyle } from './dressStyle'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, orderDetail, reviews, dressStyle],
}
