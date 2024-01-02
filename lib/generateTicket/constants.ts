import { CONFIRMATION_TOAST_BG_COLOR } from '@/app/order/_components/constants'

export const PRIMARY_COLOR = '#FFB000'

export const FONT_FAMILY_REGULAR = 'Rawson_Pro_regular'
export const FONT_FAMILY_BOLD_ITALIC = 'Rawson_Pro_bold_italic'
export const FONT_FAMILY_SEMIBOLD = 'Rawson_Pro_semibold'
export const FONT_FAMILY_BOLD = 'Rawson_Pro_bold'
export const FONT_FAMILY_MEDIUM = 'Rawson_Pro_medium'

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
