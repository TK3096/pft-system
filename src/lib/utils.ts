import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import dayjs from 'dayjs'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const getCurrentDate = () => {
  return dayjs().format()
}

export const formatDate = (value: string, pattern = 'YYYY-MM-DD HH:MM:ss') => {
  return dayjs(value).format(pattern)
}
