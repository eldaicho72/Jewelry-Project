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


export const ProductList = () => {
  
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', category: 'Rings', price: 100, currency: '$', stock: 50, material: 'Silver', status: 'Active' },
    { id: 2, name: 'Product 2', category: 'Chains', price: 200, currency: 'COP', stock: 30, material: 'Gold 10k', status: 'Inactive' },
    // Agrega más productos según sea necesario
  ])
  const [filterName, setFilterName] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [filterMaterial, setFilterMaterial] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    currency: '',
    stock: '',
    material: '',
    status: ''
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products')
      setProducts(response.data)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const handleAddProduct = async () => {
    try {
      const response = await axios.post('/api/products', newProduct)
      setProducts([...products, response.data])
      setVisibleAdd(false)
      setNewProduct({
        name: '',
        category: '',
        price: '',
        currency: '',
        stock: '',
        material: '',
        status: ''
      })
    } catch (error) {
      console.error('Error adding product:', error)
    }
  }

  const handleEditProduct = async () => {
    try {
      const response = await axios.put(`/api/products/${selectedProduct.id}`, selectedProduct)
      setProducts(products.map(product => product.id === selectedProduct.id ? response.data : product))
      setVisibleEdit(false)
      setSelectedProduct(null)
    } catch (error) {
      console.error('Error editing product:', error)
    }
  }

  const handleDeleteProduct = async () => {
    try {
      await axios.delete(`/api/products/${selectedProduct.id}`)
      setProducts(products.filter(product => product.id !== selectedProduct.id))
      setVisibleDelete(false)
      setSelectedProduct(null)
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(filterName.toLowerCase()) &&
      product.category.toLowerCase().includes(filterCategory.toLowerCase()) &&
      product.material.toLowerCase().includes(filterMaterial.toLowerCase()) &&
      (filterStatus === '' || filterStatus === 'Show all' || product.status === filterStatus)
    )
  })

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <h4 className="mb-0">Products</h4>
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
              <CFormSelect
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                defaultValue=""
              >
                <option value="" disabled hidden>
                  Filter by Category
                </option>
                <option value="Rings">Rings</option>
                <option value="Chains">Chains</option>
                <option value="Bracelets">Bracelets</option>
                <option value="Hoops">Hoops</option>
                <option value="Studs">Studs</option>
                <option value="Rosaries">Rosaries</option>
                <option value="Charms">Charms</option>
              </CFormSelect>
            </CCol>
            <CCol md={3}>
              <CFormSelect
                value={filterMaterial}
                onChange={(e) => setFilterMaterial(e.target.value)}
                defaultValue=""
              >
                <option value="" disabled hidden>
                  Filter by Material
                </option>
                <option value="Silver">Silver</option>
                <option value="Gold 10k">Gold 10k</option>
                <option value="Gold 18k">Gold 18k</option>
                <option value="Silver & Gold">Silver & Gold</option>
              </CFormSelect>
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
              <CButton color="info" style={{ color: 'white' }} onClick={() => setVisibleAdd(true)}>
                Add Product
              </CButton>
            </CCol>
          </CRow>
        </CForm>

        <CTable hover responsive className="mt-4">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Category</CTableHeaderCell>
              <CTableHeaderCell>Price</CTableHeaderCell>
              <CTableHeaderCell>Currency</CTableHeaderCell>
              <CTableHeaderCell>Stock</CTableHeaderCell>
              <CTableHeaderCell>Material</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredProducts.map((product, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{product.id}</CTableDataCell>
                <CTableDataCell>{product.name}</CTableDataCell>
                <CTableDataCell>{product.category}</CTableDataCell>
                <CTableDataCell>{product.price}</CTableDataCell>
                <CTableDataCell>{product.currency}</CTableDataCell>
                <CTableDataCell>{product.stock}</CTableDataCell>
                <CTableDataCell>{product.material}</CTableDataCell>
                <CTableDataCell>{product.status}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="info"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedProduct(product)
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
                      setSelectedProduct(product)
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
            <CModalTitle>Add Product</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput
              placeholder="Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="mb-3"
            />
            <CFormSelect
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              className="mb-3"
            >
              <option value="" disabled hidden>
                Category
              </option>
              <option value="Rings">Rings</option>
              <option value="Chains">Chains</option>
              <option value="Bracelets">Bracelets</option>
              <option value="Hoops">Hoops</option>
              <option value="Studs">Studs</option>
              <option value="Rosaries">Rosaries</option>
              <option value="Charms">Charms</option>
            </CFormSelect>
            <CFormInput
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className="mb-3"
            />
            <CFormSelect
              value={newProduct.currency}
              onChange={(e) => setNewProduct({ ...newProduct, currency: e.target.value })}
              className="mb-3"
            >
              <option value="" disabled hidden>
                Currency
              </option>
              <option value="$">$</option>
              <option value="COP">COP</option>
              <option value="Bs">Bs</option>
            </CFormSelect>
            <CFormInput
              placeholder="Stock"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
              className="mb-3"
            />
            <CFormSelect
              value={newProduct.material}
              onChange={(e) => setNewProduct({ ...newProduct, material: e.target.value })}
              className="mb-3"
            >
              <option value="" disabled hidden>
                Material
              </option>
              <option value="Silver">Silver</option>
              <option value="Gold 10k">Gold 10k</option>
              <option value="Gold 18k">Gold 18k</option>
              <option value="Silver & Gold">Silver & Gold</option>
            </CFormSelect>
            <CFormSelect
              value={newProduct.status}
              onChange={(e) => setNewProduct({ ...newProduct, status: e.target.value })}
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
            <CButton color="info" style={{ color: 'white' }} onClick={handleAddProduct}>
              Save
            </CButton>
            <CButton color="danger" style={{ color: 'white' }} onClick={() => setVisibleAdd(false)}>
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>

        <CModal visible={visibleEdit} onClose={() => setVisibleEdit(false)}>
          <CModalHeader>
            <CModalTitle>Edit Product</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput
              placeholder="Name"
              value={selectedProduct?.name}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
              className="mb-3"
            />
            <CFormSelect
              value={selectedProduct?.category}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })}
              className="mb-3"
            >
              <option value="" disabled hidden>
                Category
              </option>
              <option value="Rings">Rings</option>
              <option value="Chains">Chains</option>
              <option value="Bracelets">Bracelets</option>
              <option value="Hoops">Hoops</option>
              <option value="Studs">Studs</option>
              <option value="Rosaries">Rosaries</option>
              <option value="Charms">Charms</option>
            </CFormSelect>
            <CFormInput
              placeholder="Price"
              value={selectedProduct?.price}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
              className="mb-3"
            />
            <CFormSelect
              value={selectedProduct?.currency}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, currency: e.target.value })}
              className="mb-3"
            >
              <option value="" disabled hidden>
                Currency
              </option>
              <option value="$">$</option>
              <option value="COP">COP</option>
              <option value="Bs">Bs</option>
            </CFormSelect>
            <CFormInput
              placeholder="Stock"
              value={selectedProduct?.stock}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, stock: e.target.value })}
              className="mb-3"
            />
            <CFormSelect
              value={selectedProduct?.material}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, material: e.target.value })}
              className="mb-3"
            >
              <option value="" disabled hidden>
                Material
              </option>
              <option value="Silver">Silver</option>
              <option value="Gold 10k">Gold 10k</option>
              <option value="Gold 18k">Gold 18k</option>
              <option value="Silver & Gold">Silver & Gold</option>
            </CFormSelect>
            <CFormSelect
              value={selectedProduct?.status}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, status: e.target.value })}
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
            <CButton color="info" style={{ color: 'white' }} onClick={handleEditProduct}>
              Save
            </CButton>
            <CButton color="danger" style={{ color: 'white' }} onClick={() => setVisibleEdit(false)}>
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>

        <CModal visible={visibleDelete} onClose={() => setVisibleDelete(false)}>
          <CModalHeader>
            <CModalTitle>Delete Product</CModalTitle>
          </CModalHeader>
          <CModalBody>
            Are you sure you want to delete {selectedProduct?.name}?
          </CModalBody>
          <CModalFooter>
            <CButton color="info" style={{ color: 'white' }} onClick={handleDeleteProduct}>
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

export default ProductList
