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


export const PaymentsList = () => {
  
  const [payments, setPayments] = useState([
    { id: 1, invoice_id: 1, payment_amount: 100, payment_date: '2024-11-01', payment_method_id: 1, status: 'Completed' },
    { id: 2, invoice_id: 2, payment_amount: 200, payment_date: '2024-11-02', payment_method_id: 2, status: 'Pending' },
    // Agrega más pagos según sea necesario
  ])
  const [filterInvoiceId, setFilterInvoiceId] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [newPayment, setNewPayment] = useState({
    invoice_id: '',
    payment_amount: '',
    payment_date: '',
    payment_method_id: '',
    status: ''
  })

  useEffect(() => {
    fetchPayments()
  }, [])

  const fetchPayments = async () => {
    try {
      const response = await axios.get('/api/payments')
      setPayments(response.data)
    } catch (error) {
      console.error('Error fetching payments:', error)
    }
  }

  const handleAddPayment = async () => {
    try {
      const response = await axios.post('/api/payments', newPayment)
      setPayments([...payments, response.data])
      setVisibleAdd(false)
      setNewPayment({
        invoice_id: '',
        payment_amount: '',
        payment_date: '',
        payment_method_id: '',
        status: ''
      })
    } catch (error) {
      console.error('Error adding payment:', error)
    }
  }

  const handleEditPayment = async () => {
    try {
      const response = await axios.put(`/api/payments/${selectedPayment.id}`, selectedPayment)
      setPayments(payments.map(payment => payment.id === selectedPayment.id ? response.data : payment))
      setVisibleEdit(false)
      setSelectedPayment(null)
    } catch (error) {
      console.error('Error editing payment:', error)
    }
  }

  const handleDeletePayment = async () => {
    try {
      await axios.delete(`/api/payments/${selectedPayment.id}`)
      setPayments(payments.filter(payment => payment.id !== selectedPayment.id))
      setVisibleDelete(false)
      setSelectedPayment(null)
    } catch (error) {
      console.error('Error deleting payment:', error)
    }
  }

  const filteredPayments = payments.filter((payment) => {
    return (
      payment.invoice_id.toString().includes(filterInvoiceId) &&
      (filterStatus === '' || filterStatus === 'Show all' || payment.status === filterStatus)
    )
  })

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <h4 className="mb-0">Payments</h4>
      </CCardHeader>
      <CCardBody>
        <CForm className="mb-4">
          <CRow className="g-3">
            <CCol md={3}>
              <CFormInput
                type="text"
                placeholder="Filter by Invoice ID"
                value={filterInvoiceId}
                onChange={(e) => setFilterInvoiceId(e.target.value)}
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
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </CFormSelect>
            </CCol>
            <CCol md={3}>
              <CButton color="info" style={{ color: 'white' }} onClick={() => setVisibleAdd(true)}>
                Add Payment
              </CButton>
            </CCol>
          </CRow>
        </CForm>

        <CTable hover responsive className="mt-4">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableHeaderCell>Invoice ID</CTableHeaderCell>
              <CTableHeaderCell>Amount</CTableHeaderCell>
              <CTableHeaderCell>Date</CTableHeaderCell>
              <CTableHeaderCell>Method</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredPayments.map((payment, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{payment.id}</CTableDataCell>
                <CTableDataCell>{payment.invoice_id}</CTableDataCell>
                <CTableDataCell>{payment.payment_amount}</CTableDataCell>
                <CTableDataCell>{payment.payment_date}</CTableDataCell>
                <CTableDataCell>{payment.payment_method_id}</CTableDataCell>
                <CTableDataCell>{payment.status}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="info"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedPayment(payment)
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
                      setSelectedPayment(payment)
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
            <CModalTitle>Add Payment</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput
              placeholder="Invoice ID"
              value={newPayment.invoice_id}
              onChange={(e) => setNewPayment({ ...newPayment, invoice_id: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              placeholder="Amount"
              value={newPayment.payment_amount}
              onChange={(e) => setNewPayment({ ...newPayment, payment_amount: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              type="date"
              placeholder="Date"
              value={newPayment.payment_date}
              onChange={(e) => setNewPayment({ ...newPayment, payment_date: e.target.value })}
              className="mb-3"
            />
            <CFormSelect
              value={newPayment.payment_method_id}
              onChange={(e) => setNewPayment({ ...newPayment, payment_method_id: e.target.value })}
              className="mb-3"
            >
              <option value="" disabled hidden>
                Payment Method
              </option>
              <option value="">Bank Transfer</option>
              <option value="2">Cash</option>
            </CFormSelect>
            <CFormSelect
              value={newPayment.status}
              onChange={(e) => setNewPayment({ ...newPayment, status: e.target.value })}
              className="mb-3"
            >
              <option value="" disabled hidden>
                Status
              </option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </CFormSelect>
          </CModalBody>
          <CModalFooter>
            <CButton color="info" style={{ color: 'white' }} onClick={handleAddPayment}>
              Save
            </CButton>
            <CButton color="danger" style={{ color: 'white' }} onClick={() => setVisibleAdd(false)}>
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>
        <CModal visible={visibleEdit} onClose={() => setVisibleEdit(false)}>
          <CModalHeader>
            <CModalTitle>Edit Payment</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput
              placeholder="Invoice ID"
              value={selectedPayment?.invoice_id}
              onChange={(e) => setSelectedPayment({ ...selectedPayment, invoice_id: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              placeholder="Amount"
              value={selectedPayment?.payment_amount}
              onChange={(e) => setSelectedPayment({ ...selectedPayment, payment_amount: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              type="date"
              placeholder="Date"
              value={selectedPayment?.payment_date}
              onChange={(e) => setSelectedPayment({ ...selectedPayment, payment_date: e.target.value })}
              className="mb-3"
            />
            <CFormSelect
              value={selectedPayment?.payment_method_id}
              onChange={(e) => setSelectedPayment({ ...selectedPayment, payment_method_id: e.target.value })}
              className="mb-3"
            >
              <option value="" disabled hidden>
                Payment Method
              </option>
              <option value="1">Bank Transfer</option>
              <option value="2">Cash</option>
            </CFormSelect>
            <CFormSelect
              value={selectedPayment?.status}
              onChange={(e) => setSelectedPayment({ ...selectedPayment, status: e.target.value })}
              className="mb-3"
            >
              <option value="" disabled hidden>
                Status
              </option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </CFormSelect>
          </CModalBody>
          <CModalFooter>
            <CButton color="info" style={{ color: 'white' }} onClick={handleEditPayment}>
              Save
            </CButton>
            <CButton color="danger" style={{ color: 'white' }} onClick={() => setVisibleEdit(false)}>
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>

        <CModal visible={visibleDelete} onClose={() => setVisibleDelete(false)}>
          <CModalHeader>
            <CModalTitle>Delete Payment</CModalTitle>
          </CModalHeader>
          <CModalBody>
            Are you sure you want to delete this payment?
          </CModalBody>
          <CModalFooter>
            <CButton color="info" style={{ color: 'white' }} onClick={handleDeletePayment}>
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

export default PaymentsList
