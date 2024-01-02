import { describe, test, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Modal } from './Modal'

describe('Modal', () => {

  beforeEach(() => {
    render(
      <Modal>
        <Modal.Trigger>
          <button id='open-modal'>Open</button>
        </Modal.Trigger>
        <Modal.Header>
          Header
        </Modal.Header>
        <Modal.Body>
          Body
        </Modal.Body>
        <Modal.Footer>
          Footer
        </Modal.Footer>
      </Modal>
    )
  })

  test('should render', () => {
    expect(screen.getByText('Open')).toBeDefined()
  })

  test('should not show the modal if it is not open', () => {
    expect(screen.queryByText(/header/i)).toBeNull()
  })

  test('should show the modal if it is open', () => {
    const openButton = screen.getByText(/open/i)
    fireEvent.click(openButton)
    expect(screen.getByText(/header/i)).toBeDefined()
  })

})