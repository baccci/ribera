export const PHRASE: { [key: string]: string } = {
  delivery:
    'Tu pedido está siendo preparado y será enviado a la dirección que nos proporcionaste cuando esté listo.',
  pickup:
    'Tu pedido está siendo preparado y estará listo para que lo retires en aproximadamente 45 minutos.',
  dinein:
    'Tu pedido pronto será preparado y llevado a la mesa por un/a mozo/a'
}

type Color = {
  light: {
    color: string
    class: string
  },
  normal: {
    color: string
    class?: string
  }
}

export const CONFIRMATION_TOAST_BG_COLOR: { paid: Color, unpaid: Color } = {
  paid: {
    light: {
      color: '#DCFCE8',
      class: 'bg-green-100'
    },
    normal: {
      color: '#48A776',
      class: ''
    }
  },
  unpaid: {
    light: {
      color: '#FFF7E4',
      class: 'bg-light-yellow'
    },
    normal: {
      color: '#FFB000',
      class: ''
    }
  }
}

export const CONFIRMATION_TOAST_MESSAGE = {
  paid: 'Pago exitoso',
  unpaid: 'Pedido registrado'
}