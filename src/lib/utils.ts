import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import dayjs from 'dayjs'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const createTimestamp = () => {
  return dayjs().unix()
}
