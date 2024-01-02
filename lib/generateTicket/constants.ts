import { CONFIRMATION_TOAST_BG_COLOR } from '@/app/order/_components/constants'

export const PRIMARY_COLOR = '#FFB000'

export const FONT_FAMILY = 'Rawson Pro'

export const CONFIRMATION_RECT_BG_COLOR = {
  paid: {
    light: CONFIRMATION_TOAST_BG_COLOR.paid.light.color,
    normal: CONFIRMATION_TOAST_BG_COLOR.paid.normal.color
  },
  unpaid: {
    light: CONFIRMATION_TOAST_BG_COLOR.unpaid.light.color,
    normal: CONFIRMATION_TOAST_BG_COLOR.unpaid.normal.color
  }
}
