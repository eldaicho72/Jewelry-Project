import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPeople,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilUser,
  cilWc,
  cilDollar,
  cilWallet,
  cilCart,
  cilLibrary,
  cilContact,
  cilDiamond,
  cilMenu,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'User Management',
  },
  {
    component: CNavItem,
    name: 'Add User',
    to: '/add-user',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'User Management',
    to: '/user-management',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'User List',
        to: '/user-management/user-list',
      },
      {
        component: CNavItem,
        name: 'Edit User',
        to: '/user-management/edit-user',
      },
      {
        component: CNavItem,
        name: 'Delete User',
        to: '/user-management/delete-user',
      },
      {
        component: CNavItem,
        name: 'Assign Roles',
        to: '/user-management/assign-roles',
      },
      {
        component: CNavItem,
        name: 'Role List',
        to: '/user-management/role-list',
      },
      {
        component: CNavItem,
        name: 'Edit Role',
        to: '/user-management/edit-role',
      },
      {
        component: CNavItem,
        name: 'Add Role',
        to: '/user-management/add-role',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Sales & Customer Management',
  },
  {
    component: CNavGroup,
    name: 'Customers',
    to: '/customers',
    icon: <CIcon icon={cilWc} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Customer Information',
        to: '/customers/customer-information',
      },
      {
        component: CNavItem,
        name: 'Billing Management',
        to: '/customers/billing-management',
      },
      {
        component: CNavItem,
        name: 'Reports & Analysis',
        to: '/customers/reports-analysis',
      },
      {
        component: CNavItem,
        name: 'Notification Management',
        to: '/customers/notification-management',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Invoices',
    to: '/invoices',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Payments',
    to: '/payments',
    icon: <CIcon icon={cilDollar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Payment Methods',
    to: '/payment-methods',
    icon: <CIcon icon={cilWallet} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Inventory & Products',
  },
  {
    component: CNavGroup,
    name: 'Products',
    icon: <CIcon icon={cilDiamond} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Product List',
        to: '/products/product-list',
      },
      {
        component: CNavItem,
        name: 'Product Categories',
        to: '/products/product-categories',
      },
      {
        component: CNavItem,
        name: 'Administration Options',
        to: '/products/administration-options',
      },
      {
        component: CNavItem,
        name: 'Export Options',
        to: '/products/export-options',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Inventory Movements',
    to: '/inventory-movements',
    icon: <CIcon icon={cilLibrary} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Supplier Management',
  },
  {
    component: CNavItem,
    name: 'Suppliers',
    to: '/suppliers',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Manufacturing & Repairs',
  },
  {
    component: CNavItem,
    name: 'Repairs',
    to: '/repairs',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Manufacturing Orders',
    to: '/manufacturing-orders',
    icon: <CIcon icon={cilDiamond} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilMenu} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
    ],
  },
]

export default _nav
