import React, { useState, useEffect } from 'react'
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

export const CustomersList = () => {
  
  const [customers, setCustomers] = useState([
    { id_card: 'V12345678', first_name: 'Carlos', last_name: 'Perez', email: 'carlos.perez@example.com', phone_number: '04141234567', address: 'Calle 123, Caracas', status: 'Active', }, { id_card: 'V87654321', first_name: 'Maria', last_name: 'Gomez', email: 'maria.gomez@example.com', phone_number: '04141234568', address: 'Avenida 456, Maracaibo', status: 'Active', }, { id_card: 'V11223344', first_name: 'Jose', last_name: 'Rodriguez', email: 'jose.rodriguez@example.com', phone_number: '04141234569', address: 'Calle 789, Valencia', status: 'Inactive', }, { id_card: 'V44332211', first_name: 'Ana', last_name: 'Martinez', email: 'ana.martinez@example.com', phone_number: '04141234570', address: 'Avenida 101, Barquisimeto', status: 'Active', }, { id_card: 'V99887766', first_name: 'Luis', last_name: 'Fernandez', email: 'luis.fernandez@example.com', phone_number: '04141234571', address: 'Calle 202, Maracay', status: 'Inactive', },
  ])
  const [filterName, setFilterName] = useState('')
  const [filterId, setFilterId] = useState('')
  const [filterStatus, setFilterStatus] = useState('Show all')
  const [filterPhone, setFilterPhone] = useState('')
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState(null)

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('/api/customers')
      setCustomers(response.data)
    } catch (error) {
      console.error('Error fetching customers:', error)
    }
  }

  const filteredCustomers = customers.filter((customer) => {
    return (
      customer.first_name.toLowerCase().includes(filterName.toLowerCase()) &&
      customer.id_card.includes(filterId) &&
      (filterStatus === 'Show all' || customer.status === filterStatus) &&
      customer.phone_number.includes(filterPhone)
    )
  })

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <h4 className="mb-0">Customers</h4>
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
                type="text"
                placeholder="Filter by ID"
                value={filterId}
                onChange={(e) => setFilterId(e.target.value)}
              />
            </CCol>
            <CCol md={3}>
              <CFormSelect
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                defaultValue=""
              >
                <option value="" disabled hidden>
                  Filter by Status
                </option>
                <option value="Show all">Show all</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
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
                Add Customer
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
              <CTableHeaderCell>Phone</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredCustomers.map((customer, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{customer.id_card}</CTableDataCell>
                <CTableDataCell>{customer.first_name}</CTableDataCell>
                <CTableDataCell>{customer.last_name}</CTableDataCell>
                <CTableDataCell>{customer.email}</CTableDataCell>
                <CTableDataCell>{customer.phone_number}</CTableDataCell>
                <CTableDataCell>{customer.status}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="info"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedCustomer(customer)
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
                      setSelectedCustomer(customer)
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
            <CModalTitle>Add Customer</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput placeholder="First Name" className="mb-3" />
            <CFormInput placeholder="Last Name" className="mb-3" />
            <CFormInput placeholder="Email" className="mb-3" />
            <CFormInput placeholder="Phone" className="mb-3" />
            <CFormInput placeholder="Address" className="mb-3" />
            <CFormSelect className="mb-3" defaultValue="">
              <option value="" disabled hidden>
                Status
              </option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
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
            <CModalTitle>Edit Customer</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput
              placeholder="First Name"
              defaultValue={selectedCustomer?.first_name}
              className="mb-3"
            />
            <CFormInput
              placeholder="Last Name"
              defaultValue={selectedCustomer?.last_name}
              className="mb-3"
            />
            <CFormInput
              placeholder="ID"
              defaultValue={selectedCustomer?.id_card}
              className="mb-3"
            />
            <CFormInput placeholder="Email" defaultValue={selectedCustomer?.email} className="mb-3" />
            <CFormInput
              placeholder="Phone"
              defaultValue={selectedCustomer?.phone_number}
              className="mb-3"
            />
            <CFormInput
              placeholder="Address"
              defaultValue={selectedCustomer?.address}
              className="mb-3"
            />
            <CFormSelect
              defaultValue={selectedCustomer?.status}
              className="mb-3"
            >
              <option value="" disabled hidden>
                Status
              </option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
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
            <CModalTitle>Delete Customer</CModalTitle>
          </CModalHeader>
          <CModalBody>
            Are you sure you want to delete {selectedCustomer?.first_name} {selectedCustomer?.last_name}?
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

export default CustomersList
