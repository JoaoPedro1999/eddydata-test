import React, { useState, useEffect } from 'react'
import ReactModal from 'react-modal'

interface IModalProps {
  children: React.ReactNode
  isOpen: boolean
  padding?: string
  width?: string
  maxWidth?: string
  height?: string
  contentColor?: string
  overlayColor?: string
  zIndex?: number
  shouldCloseOnOverlayClick?: boolean
  setIsOpen: () => void
}

export const Modal: React.FC<IModalProps> = ({
  children,
  isOpen,
  setIsOpen,
  shouldCloseOnOverlayClick = true,
  padding = '1.6rem',
  width = '50rem',
  maxWidth = '90%',
  height = 'auto',
  contentColor = 'rgb(40, 40, 40)',
  overlayColor = 'rgba(0, 0, 0, 0.7)',
  zIndex = 6,
}) => {
  const [modalStatus, setModalStatus] = useState(isOpen)

  useEffect(() => {
    setModalStatus(isOpen)
  }, [isOpen])

  return (
    <ReactModal
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      shouldCloseOnEsc={shouldCloseOnOverlayClick}
      onRequestClose={setIsOpen}
      isOpen={modalStatus}
      ariaHideApp={false}
      style={{
        content: {
          position: 'relative',
          width,
          maxWidth,
          height,
          maxHeight: '100%',
          overflow: 'visible',
          overflowY: 'auto',
          background: '#000',
          inset: '0',
          padding,
          backgroundColor: contentColor,
          border: contentColor,
        },
        overlay: {
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: overlayColor,
          zIndex,
        },
      }}
    >
      {children}
    </ReactModal>
  )
}
