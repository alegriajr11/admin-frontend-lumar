import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCouponComponent } from './list-coupon/list-coupon.component';
import { CreateCouponComponent } from './create-coupon/create-coupon.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-coupons',
        component: ListCouponComponent,
        data: {
          title: "Lista de Cupones",
          breadcrumb: "Lista de Cupones"
        }
      },
      {
        path: 'create-coupons',
        component: CreateCouponComponent,
        data: {
          title: "Crear Cupón",
          breadcrumb: "Crear Cupón"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponsRoutingModule { }
