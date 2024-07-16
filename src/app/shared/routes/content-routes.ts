import { Routes } from '@angular/router';

export const content: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../../components/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'productos',
    loadChildren: () => import('../../components/products/products.module').then(m => m.ProductsModule),
    data: {
      breadcrumb: "Productos"
    }
  },
  {
    path: 'ventas',
    loadChildren: () => import('../../components/sales/sales.module').then(m => m.SalesModule),
    data: {
      breadcrumb: "Ventas"
    }
  },
  {
    path: 'coupons',
    loadChildren: () => import('../../components/coupons/coupons.module').then(m => m.CouponsModule),
    data: {
      breadcrumb: "Cupones"
    }
  },
  {
    path: 'pages',
    loadChildren: () => import('../../components/pages/pages.module').then(m => m.PagesModule),
    data: {
      breadcrumb: "Pages"
    }
  },
  {
    path: 'menus',
    loadChildren: () => import('../../components/menus/menus.module').then(m => m.MenusModule),
    data: {
      breadcrumb: "Menus"
    }
  },
  {
    path: 'users',
    loadChildren: () => import('../../components/users/users.module').then(m => m.UsersModule),
    data: {
      breadcrumb: "Usuarios"
    }
  },

  {
    path: 'reports',
    loadChildren: () => import('../../components/reports/reports.module').then(m => m.ReportsModule),
  },
  {
    path: 'settings',
    loadChildren: () => import('../../components/setting/setting.module').then(m => m.SettingModule),
    data: {
      breadcrumb: "Configuración"
    }
  },
  {
    path: 'invoice',
    loadChildren: () => import('../../components/invoice/invoice.module').then(m => m.InvoiceModule),
    data: {
      breadcrumb: "Pedidos"
    }
  }
];