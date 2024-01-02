import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isNumber(value: string) {
  return typeof value === 'number' && !isNaN(value)
}

/**
 * Safely parses a string into an integer.
 * If the input is not a string, it returns 0.
 * It removes all non-digit characters from the string before parsing.
 * @param string - The string to parse into an integer.
 * @returns The parsed integer value.
 */
export function safeParseInt(string: unknown) {
  if (typeof string !== 'string') return 0

  const matchEverytingButNumbersRegex = /[^\d]/g
  const stringNumbers = string.replace(matchEverytingButNumbersRegex, '')

  return parseInt(stringNumbers)
}