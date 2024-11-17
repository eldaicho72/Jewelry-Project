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


const STATUS_OPTIONS = ['Paid', 'Unpaid', 'Overdue']

export const InvoicesList = () => {
  const [invoices, setInvoices] = useState([
    { id: 1, user_id: 1, customer_id: 1, invoice_number: 'INV-001', invoice_date: '2024-11-01', due_date: '2024-11-15', total: 500.00, status: 'Paid', payment_method_id: 1 },
    { id: 2, user_id: 2, customer_id: 2, invoice_number: 'INV-002', invoice_date: '2024-11-02', due_date: '2024-11-16', total: 300.00, status: 'Unpaid', payment_method_id: 2 },
    { id: 3, user_id: 3, customer_id: 3, invoice_number: 'INV-003', invoice_date: '2024-11-03', due_date: '2024-11-17', total: 450.00, status: 'Overdue', payment_method_id: 1 },
  ])
  const [filterInvoiceNumber, setFilterInvoiceNumber] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [visibleModal, setVisibleModal] = useState(false)
  const [modalAction, setModalAction] = useState('')
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [newInvoice, setNewInvoice] = useState({
    user_id: '',
    customer_id: '',
    invoice_number: '',
    invoice_date: '',
    due_date: '',
    total: '',
    status: '',
    payment_method_id: ''
  })

  useEffect(() => {
    fetchInvoices()
  }, [])

  const fetchInvoices = async () => {
    try {
      const response = await axios.get('/api/invoices')
      setInvoices(response.data)
    } catch (error) {
      console.error('Error fetching invoices:', error)
    }
  }

  const handleAddInvoice = async () => {
    try {
      const response = await axios.post('/api/invoices', newInvoice)
      setInvoices([...invoices, response.data])
      setVisibleModal(false)
      setNewInvoice({
        user_id: '',
        customer_id: '',
        invoice_number: '',
        invoice_date: '',
        due_date: '',
        total: '',
        status: '',
        payment_method_id: ''
      })
    } catch (error) {
      console.error('Error adding invoice:', error)
    }
  }

  const handleEditInvoice = async () => {
    try {
      const response = await axios.put(`/api/invoices/${selectedInvoice.id}`, selectedInvoice)
      setInvoices(invoices.map(invoice => invoice.id === selectedInvoice.id ? response.data : invoice))
      setVisibleModal(false)
      setSelectedInvoice(null)
    } catch (error) {
      console.error('Error editing invoice:', error)
    }
  }

  const handleDeleteInvoice = async () => {
    try {
      await axios.delete(`/api/invoices/${selectedInvoice.id}`)
      setInvoices(invoices.filter(invoice => invoice.id !== selectedInvoice.id))
      setVisibleModal(false)
      setSelectedInvoice(null)
    } catch (error) {
      console.error('Error deleting invoice:', error)
    }
  }

  const filteredInvoices = invoices.filter((invoice) => {
    return (
      invoice.invoice_number.toString().includes(filterInvoiceNumber) &&
      (filterStatus === '' || filterStatus === 'Show all' || invoice.status === filterStatus)
    )
  })

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <h4 className="mb-0">Invoices</h4>
      </CCardHeader>
      <CCardBody>
        <CForm className="mb-4">
          <CRow className="g-3">
            <CCol md={3}>
              <CFormInput
                type="text"
                placeholder="Filter by Invoice Number"
                value={filterInvoiceNumber}
                onChange={(e) => setFilterInvoiceNumber(e.target.value)}
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
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={3}>
              <CButton color="info" style={{ color: 'white' }} onClick={() => { setVisibleModal(true); setModalAction('add') }}>
                Add Invoice
              </CButton>
            </CCol>
          </CRow>
        </CForm>
        <CTable hover responsive className="mt-4">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableHeaderCell>Invoice Number</CTableHeaderCell>
              <CTableHeaderCell>Customer ID</CTableHeaderCell>
              <CTableHeaderCell>Date</CTableHeaderCell>
              <CTableHeaderCell>Due Date</CTableHeaderCell>
              <CTableHeaderCell>Total</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredInvoices.map((invoice, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{invoice.id}</CTableDataCell>
                <CTableDataCell>{invoice.invoice_number}</CTableDataCell>
                <CTableDataCell>{invoice.customer_id}</CTableDataCell>
                <CTableDataCell>{invoice.invoice_date}</CTableDataCell>
                <CTableDataCell>{invoice.due_date}</CTableDataCell>
                <CTableDataCell>{invoice.total}</CTableDataCell>
                <CTableDataCell>{invoice.status}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="info"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedInvoice(invoice)
                      setModalAction('edit')
                      setVisibleModal(true)
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
                      setSelectedInvoice(invoice)
                      setModalAction('delete')
                      setVisibleModal(true)
                    }}
                  >
                    Delete
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>

        <CModal visible={visibleModal} onClose={() => setVisibleModal(false)}>
          <CModalHeader>
            <CModalTitle>{modalAction === 'add' ? 'Add Invoice' : modalAction === 'edit' ? 'Edit Invoice' : 'Delete Invoice'}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {modalAction === 'delete' ? (
              <p>Are you sure you want to delete this invoice?</p>
            ) : (
              <>
                <CFormInput
                  placeholder="Invoice Number"
                  value={modalAction === 'add' ? newInvoice.invoice_number : selectedInvoice?.invoice_number}
                  onChange={(e) => modalAction === 'add' ? setNewInvoice({ ...newInvoice, invoice_number: e.target.value }) : setSelectedInvoice({ ...selectedInvoice, invoice_number: e.target.value })}
                  className="mb-3"
                />
                <CFormInput
                  placeholder="Customer ID"
                  value={modalAction === 'add' ? newInvoice.customer_id : selectedInvoice?.customer_id}
                  onChange={(e) => modalAction === 'add' ? setNewInvoice({ ...newInvoice, customer_id: e.target.value }) : setSelectedInvoice({ ...selectedInvoice, customer_id: e.target.value })}
                  className="mb-3"
                />
                <CFormInput
                  type="date"
                  placeholder="Invoice Date"
                  value={modalAction === 'add' ? newInvoice.invoice_date : selectedInvoice?.invoice_date}
                  onChange={(e) => modalAction === 'add' ? setNewInvoice({ ...newInvoice, invoice_date: e.target.value }) : setSelectedInvoice({ ...selectedInvoice, invoice_date: e.target.value })}
                  className="mb-3"
                />
                                <CFormInput
                  type="date"
                  placeholder="Due Date"
                  value={modalAction === 'add' ? newInvoice.due_date : selectedInvoice?.due_date}
                  onChange={(e) => modalAction === 'add' ? setNewInvoice({ ...newInvoice, due_date: e.target.value }) : setSelectedInvoice({ ...selectedInvoice, due_date: e.target.value })}
                  className="mb-3"
                />
                <CFormInput
                  placeholder="Total"
                  value={modalAction === 'add' ? newInvoice.total : selectedInvoice?.total}
                  onChange={(e) => modalAction === 'add' ? setNewInvoice({ ...newInvoice, total: e.target.value }) : setSelectedInvoice({ ...selectedInvoice, total: e.target.value })}
                  className="mb-3"
                />
                <CFormSelect
                  value={modalAction === 'add' ? newInvoice.status : selectedInvoice?.status}
                  onChange={(e) => modalAction === 'add' ? setNewInvoice({ ...newInvoice, status: e.target.value }) : setSelectedInvoice({ ...selectedInvoice, status: e.target.value })}
                  className="mb-3"
                >
                  <option value="" disabled hidden>
                    Status
                  </option>
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </CFormSelect>
                <CFormSelect
                  value={modalAction === 'add' ? newInvoice.payment_method_id : selectedInvoice?.payment_method_id}
                  onChange={(e) => modalAction === 'add' ? setNewInvoice({ ...newInvoice, payment_method_id: e.target.value }) : setSelectedInvoice({ ...selectedInvoice, payment_method_id: e.target.value })}
                  className="mb-3"
                >
                  <option value="" disabled hidden>
                    Payment Method
                  </option>
                  <option value="1">Bank Transfer</option>
                  <option value="2">Cash</option>
                </CFormSelect>
              </>
            )}
          </CModalBody>
          <CModalFooter>
            {modalAction === 'delete' ? (
              <CButton color="danger" style={{ color: 'white' }} onClick={handleDeleteInvoice}>
                Delete
              </CButton>
            ) : (
              <CButton color="info" style={{ color: 'white' }} onClick={modalAction === 'add' ? handleAddInvoice : handleEditInvoice}>
                Save
              </CButton>
            )}
            <CButton color="secondary" style={{ color: 'white' }} onClick={() => setVisibleModal(false)}>
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>
      </CCardBody>
    </CCard>
  )
}

export default InvoicesList
