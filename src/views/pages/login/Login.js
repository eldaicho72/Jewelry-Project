import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

import fondoLogin from 'src/assets/images/fondologin.png'

const Login = () => {
  const [showRegister, setShowRegister] = useState(false)

  useEffect(() => {
    document.body.style.margin = '0'
    document.body.style.padding = '0'
    document.body.style.height = '100vh'
    document.body.style.overflow = 'hidden'
    document.body.style.background = `url(${fondoLogin}) center center / cover no-repeat`
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        justifyContent: 'flex-end', // Empuja al formulario al lado derecho
      }}
    >
      <div
        style={{
          width: '30%', // El ancho que quieres para el contenedor del formulario
          height: '100%', // Ocupar toda la altura
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', // Centrar verticalmente
          backgroundColor: 'white', // Fondo translúcido
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        <CCard
          style={{
            width: '90%',
            maxWidth: '400px',
            margin: '0 auto',
            border: 'none',
          }}
        >
          <CCardBody>
            {showRegister ? (
              <CForm>
                <h1 className="text-center">Register</h1>
                <p className="text-body-secondary text-center">Create your account</p>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilUser} />
                  </CInputGroupText>
                  <CFormInput placeholder="Username" autoComplete="username" />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilUser} />
                  </CInputGroupText>
                  <CFormInput placeholder="Email" autoComplete="email" />
                </CInputGroup>
                <CInputGroup className="mb-4">
                  <CInputGroupText>
                    <CIcon icon={cilLockLocked} />
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    placeholder="Password"
                    autoComplete="new-password"
                  />
                </CInputGroup>
                <CRow>
                  <CButton
                    style={{ backgroundColor: '#172c6a', color: 'white' }}
                    className="px-4 w-100 mb-2"
                  >
                    Register
                  </CButton>
                  <CButton
                    color="secondary"
                    className="px-4 w-100"
                    onClick={() => setShowRegister(false)}
                    style={{ color: 'white' }}
                  >
                    Back to Login
                  </CButton>
                </CRow>
              </CForm>
            ) : (
              <CForm>
                <h1 className="text-center">Login</h1>
                <p className="text-body-secondary text-center">Sign In to your account</p>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilUser} />
                  </CInputGroupText>
                  <CFormInput placeholder="Username" autoComplete="username" />
                </CInputGroup>
                <CInputGroup className="mb-4">
                  <CInputGroupText>
                    <CIcon icon={cilLockLocked} />
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                  />
                </CInputGroup>
                <CRow>
                  <CButton
                    style={{ backgroundColor: '#172c6a', color: 'white' }}
                    className="px-4 w-100 mb-2"
                  >
                    Login
                  </CButton>
                  <CButton
                    style={{ backgroundColor: 'black', color: 'white' }}
                    className="px-4 w-100"
                    onClick={() => setShowRegister(true)}
                  >
                    Register Now
                  </CButton>
                </CRow>
              </CForm>
            )}
          </CCardBody>
        </CCard>
      </div>
    </div>
  )
}

export default Login
