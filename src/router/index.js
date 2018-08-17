import Vue from 'vue'
import Router from 'vue-router'
import HomeComponent from '@/components/HomeComponent'
import AuthComponent from '@/components/AuthComponent'
import AuthCallback from '@/components/AuthCallback'
import Settings from '@/components/settings/Settings'
import Invoices from '@/components/invoices/Invoices'
import Customers from '@/components/customers/Customers'
import NewInvoiceComponent from '@/components/invoices/NewInvoiceComponent'
import InvoicesIndex from '@/components/invoices/InvoicesIndex'
import IndexComponent from '@/components/IndexComponent'
import CustomersIndex from '@/components/customers/CustomersIndex'
import NewCustomerComponent from '@/components/customers/NewCustomerComponent'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'IndexComponent',
      component:IndexComponent,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/home',
      name: 'HomeComponent',
      component: HomeComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/auth',
      name: 'AuthComponent',
      component: AuthComponent,
    },
    {
      path:'/callback',
      component: AuthCallback
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/invoices',
      name: 'Invoices',
      component: Invoices,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '',
          name: 'InvoicesIndex',
          component: InvoicesIndex
        },
        {
          path:'create',
          name: 'NewInvoiceComponent',
          component: NewInvoiceComponent
        }
      ]
    },
    {
      path: '/customers',
      name: 'Customers',
      component: Customers,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path:'',
          name: 'CustomersIndex',
          component: CustomersIndex
        },
        {
          path: 'create',
          name: 'NewCustomerComponent',
          component: NewCustomerComponent
        }
      ]
    }
  ]
})
