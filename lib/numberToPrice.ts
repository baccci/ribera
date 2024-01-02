export function numberToPrice(number: number, locale: string = 'es-AR', currency: string = 'ARS') {
  return number.toLocaleString(locale,
    {
      style: 'currency',
      currency,
      minimumFractionDigits: 2
    }
  )
}