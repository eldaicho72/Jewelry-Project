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
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
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
    name: 'Users',
    to: '/theme/colors',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Roles',
    to: '/theme/typography',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Sales & Customer Management',
  },
  {
    component: CNavGroup,
    name: 'Customers',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Customer Information',
        to: '/base/accordion',
      },
      {
        component: CNavItem,
        name: 'Billing Management',
        to: '/base/breadcrumbs',
      },
      {
        component: CNavItem,
        name: 'Reports & Analysis',
        to: '/base/cards',
      },
      {
        component: CNavItem,
        name: 'Notification Management',
        to: '/base/carousels',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Invoices',
    to: '/buttons',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Payments',
    to: '/buttons',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Payments Methods',
    to: '/charts',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  
  
  {
    component: CNavTitle,
    name: 'Inventory & Products',
  },
  {
    component: CNavGroup,
    name: 'Products',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Product List',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Product Categories',
        to: '/register',
      },
      {
        component: CNavItem,
        name: 'Administration Options',
        to: '/404',
      },
      {
        component: CNavItem,
        name: 'Product Details',
        to: '/500',
      },
      {
        component: CNavItem,
        name: 'Export Options',
        to: '/500',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Inventory Movements',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Supplier Management',
  },
  {
    component: CNavItem,
    name: 'Suppliers',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Manufacturing & Repairs',
  },
  {
    component: CNavItem,
    name: 'Repairs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Manufacturing Orders',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
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
