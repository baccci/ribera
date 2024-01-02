export type Product = {
  name: string,
  price: number,
  available?: boolean,
  description: string,
  category?: string,
  imagePath: string,
  code: string
  note?: string
}

export interface MongoProduct extends Product {
  _id: string
}

export declare module 'node-font2base64' {
  export function encodeToDataUrlSync(path: string): string
}