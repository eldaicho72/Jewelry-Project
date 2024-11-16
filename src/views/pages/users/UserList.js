import React, { useState } from 'react'
import {
  CCard,
  CButton,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CRow,
  CTable,
  CTableDataCell,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormSelect,
} from '@coreui/react'

export const UserList = () => {
  const [filterName, setFilterName] = useState('')
  const [filterId, setFilterId] = useState('')
  const [filterRole, setFilterRole] = useState('Show all')
  const [filterPhone, setFilterPhone] = useState('')
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  const users = [
    {
      id: '1',
      first_name: 'Jesus',
      last_name: 'Delgado',
      email: 'eldaicho72@gmailcom',
      password: '123456',
      phone: '04141234567',
      role_id: 'Joyero',
      status: 'Activo',
    },
    {
      id: '2',
      first_name: 'Luis',
      last_name: 'Landkoer',
      email: 'luislandkoer@gmail.com',
      password: 'laculpaesdelavaca',
      phone: '04141234567',
      role_id: 'Empleado',
      status: 'Activo',
    },
    {
      id: '3',
      first_name: 'Gabriel',
      last_name: 'Gomez',
      email: 'gabrielgomez@example.com',
      password: 'password123',
      phone: '04141234568',
      role_id: 'Joyero',
      status: 'Activo',
    },
    {
      id: '4',
      first_name: 'Nelly',
      last_name: 'Arciniegas',
      email: 'nellyarciniegas@example.com',
      password: 'adminpassword',
      phone: '04141234569',
      role_id: 'Admin',
      status: 'Activo',
    },
    {
      id: '5',
      first_name: 'Ricardo',
      last_name: 'Colmenares',
      email: 'ricardocolmenares@example.com',
      password: 'joyeropassword',
      phone: '04141234570',
      role_id: 'Joyero',
      status: 'Activo',
    },
    {
      id: '6',
      first_name: 'Luz',
      last_name: 'Marina',
      email: 'luzmarina@example.com',
      password: 'empleadopassword',
      phone: '04141234571',
      role_id: 'Empleado',
      status: 'Activo',
    },
  ]

  const filteredUsers = users.filter((user) => {
    return (
      user.first_name.toLowerCase().includes(filterName.toLowerCase()) &&
      user.id.includes(filterId) &&
      (filterRole === 'Show all' || user.role_id === filterRole) &&
      user.phone.includes(filterPhone)
    )
  })

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <h4 className="mb-0">Users</h4>
      </CCardHeader>
      <CCardBody>
        <CForm className="mb-4">
          <CRow className="g-3">
            <CCol md={3}>
              <CFormInput
                type="text"
                placeholder="Filter by Name"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
              />
            </CCol>
            <CCol md={3}>
              <CFormInput
                type="number"
                placeholder="Filter by ID"
                value={filterId}
                onChange={(e) => setFilterId(e.target.value)}
              />
            </CCol>
            <CCol md={3}>
              <CFormSelect
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
              >
                <option value="Show all">Filter by Role</option>
                <option value="Admin">Admin</option>
                <option value="Joyero">Joyero</option>
                <option value="Empleado">Empleado</option>
              </CFormSelect>
            </CCol>
            <CCol md={3}>
              <CFormInput
                type="text"
                placeholder="Filter by Phone"
                value={filterPhone}
                onChange={(e) => setFilterPhone(e.target.value)}
              />
            </CCol>
            <CCol md={3}>
              <CButton color="info" style={{ color: 'white' }} onClick={() => setVisibleAdd(true)}>
                Add User
              </CButton>
            </CCol>
          </CRow>
        </CForm>

        <CTable hover responsive className="mt-4">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableHeaderCell>First Name</CTableHeaderCell>
              <CTableHeaderCell>Last Name</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Password</CTableHeaderCell>
              <CTableHeaderCell>Phone</CTableHeaderCell>
              <CTableHeaderCell>Role ID</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredUsers.map((user, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{user.id}</CTableDataCell>
                <CTableDataCell>{user.first_name}</CTableDataCell>
                <CTableDataCell>{user.last_name}</CTableDataCell>
                <CTableDataCell>{user.email}</CTableDataCell>
                <CTableDataCell>{user.password}</CTableDataCell>
                <CTableDataCell>{user.phone}</CTableDataCell>
                <CTableDataCell>{user.role_id}</CTableDataCell>
                <CTableDataCell>{user.status}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="info"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedUser(user)
                      setVisibleEdit(true)
                    }}
                    className="me-2"
                  >
                    Edit
                  </CButton>
                  <CButton
                    color="danger"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedUser(user)
                      setVisibleDelete(true)
                    }}
                  >
                    Delete
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>

        <CModal visible={visibleAdd} onClose={() => setVisibleAdd(false)}>
          <CModalHeader>
            <CModalTitle>Add User</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput placeholder="First Name" className="mb-3" />
            <CFormInput placeholder="Last Name" className="mb-3" />
            <CFormInput placeholder="Email" className="mb-3" />
            <CFormInput placeholder="Password" className="mb-3" />
            <CFormInput placeholder="Phone" className="mb-3" />
            <CFormSelect className="mb-3" defaultValue="">
              <option value="" disabled hidden>
                Role ID
              </option>
              <option value="Admin">Admin</option>
              <option value="Joyero">Joyero</option>
              <option value="Empleado">Empleado</option>
            </CFormSelect>
          </CModalBody>
          <CModalFooter>
            <CButton color="info" style={{ color: 'white' }} onClick={() => setVisibleAdd(false)}>
              Save
            </CButton>
            <CButton color="danger" style={{ color: 'white' }} onClick={() => setVisibleAdd(false)}>
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>

        <CModal visible={visibleEdit} onClose={() => setVisibleEdit(false)}>
          <CModalHeader>
            <CModalTitle>Edit User</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput
              placeholder="First Name"
              defaultValue={selectedUser?.first_name}
              className="mb-3"
            />
            <CFormInput
              placeholder="Last Name"
              defaultValue={selectedUser?.last_name}
              className="mb-3"
            />
            <CFormInput
              placeholder="ID"
              defaultValue={selectedUser?.id}
              className="mb-3"
            />
            <CFormInput placeholder="Email" defaultValue={selectedUser?.email} className="mb-3" />
            <CFormInput
              placeholder="Password"
              defaultValue={selectedUser?.password}
              className="mb-3"
            />
            <CFormInput
              placeholder="Phone"
              defaultValue={selectedUser?.phone}
              className="mb-3"
            />
            <CFormSelect
              defaultValue={selectedUser?.role_id}
              className="mb-3"
            >
              <option value="" disabled hidden>
                Role ID
              </option>
              <option value="Admin">Admin</option>
              <option value="Joyero">Joyero</option>
              <option value="Empleado">Empleado</option>
            </CFormSelect>
          </CModalBody>
          <CModalFooter>
            <CButton color="info" style={{ color: 'white' }} onClick={() => setVisibleEdit(false)}>
              Save
            </CButton>
            <CButton color="danger" style={{ color: 'white' }} onClick={() => setVisibleEdit(false)}>
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>

        <CModal visible={visibleDelete} onClose={() => setVisibleDelete(false)}>
          <CModalHeader>
            <CModalTitle>Delete User</CModalTitle>
          </CModalHeader>
          <CModalBody>
            Are you sure you want to delete {selectedUser?.first_name} {selectedUser?.last_name}?
          </CModalBody>
          <CModalFooter>
            <CButton color="info" style={{ color: 'white' }} onClick={() => setVisibleDelete(false)}>
              Save
            </CButton>
            <CButton color="danger" style={{ color: 'white' }} onClick={() => setVisibleDelete(false)}>
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>
      </CCardBody>
    </CCard>
  )
}

export default UserList

