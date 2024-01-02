import React from 'react'
import { Modal } from '@/components/Modal'
import { CreditCardForm } from './CreditCardForm'
import { PaymentMethodContext, usePaymentMethod } from './hooks'
import { Button } from '@/components/Button'
import type { BillingData, PaymentMethod } from '@/types/order'
import { validateInputs } from './utils'

interface PaymentModalProps {
  children?: React.ReactNode
  className?: string
  func?: (paymentData: BillingData, paymentMethod: PaymentMethod) => void
  currentPaymentMethod?: PaymentMethod
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ children, className, func, currentPaymentMethod }) => {
  const paymentMethodContext = usePaymentMethod()

  const {
    showModal,
    handleCloseModal,
    handleOpenModal,
    billingData: paymentData,
    paymentMethod: pMethod,
    setInputsErrors
  } = paymentMethodContext

  const handleSavePaymentData = (e: React.MouseEvent<HTMLButtonElement>) => {
    const validationResult = validateInputs(paymentData)

    if (pMethod === 'card' && !validationResult.success) {
      const errors = validationResult.error.format()
      return setInputsErrors(errors)
    }

    func && func(paymentData, pMethod)
    handleCloseModal()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleOpenModal()
    }
  }

  return (
    <PaymentMethodContext.Provider value={paymentMethodContext}>
      <Modal closeButton open={showModal} closeFn={handleCloseModal} className='p-5 sm:p-8'>
        <Modal.Trigger onClick={handleOpenModal} className={className} onKeyDown={handleKeyDown}>
          {children}
        </Modal.Trigger>
        <Modal.Header>
          Método de pago
        </Modal.Header>
        <Modal.Body className='h-full overflow-y-auto overflow-x-visible sm:overflow-y-visible px-[4px] sm:px-0 pb-1 sm:pb-0'>
          Añade un método de pago para procesar tu compra.
          <CreditCardForm currentPaymentMethod={currentPaymentMethod} />
        </Modal.Body>
        <Modal.Footer className='mt-0'>
          <div className='flex w-full flex-col gap-4 sm:flex-row sm:justify-end sm:gap-4 mt-6 sm:mt-8 sm:mb-0'>
            <Modal.CloseButton variant={'outline'} type='button' className='th:hidden'>
              Cancelar
            </Modal.CloseButton>
            <Button size={'lg'} onClick={handleSavePaymentData}>
              Guardar datos de pago
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </PaymentMethodContext.Provider>
  )
}
