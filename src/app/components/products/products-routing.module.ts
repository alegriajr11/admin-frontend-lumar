import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './physical/category/category.component';
import { SubCategoryComponent } from './physical/sub-category/sub-category.component';
import { ProductListComponent } from './physical/product-list/product-list.component';
import { AddProductComponent } from './physical/add-product/add-product.component';
import { ProductDetailComponent } from './physical/product-detail/product-detail.component';
import { SeccionComponent } from './physical/seccion/seccion.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'categoria',
        component: CategoryComponent,
        data: {
          title: "Categoria",
          breadcrumb: "Categoria"
        }
      },
      {
        path: 'seccion',
        component: SeccionComponent,
        data: {
          title: "Seccion",
          breadcrumb: "Seccion"
        }
      },
      {
        path: 'sub-categoria',
        component: SubCategoryComponent,
        data: {
          title: "Sub Categoria",
          breadcrumb: "Sub Categoria"
        }
      },
      {
        path: 'producto-lista',
        component: ProductListComponent,
        data: {
          title: "Lista de Productos",
          breadcrumb: "Lista Productos"
        }
      },
      {
        path: 'product-detail',
        component: ProductDetailComponent,
        data: {
          title: "Product Detail",
          breadcrumb: "Product Detail"
        }
      },
      {
        path: 'agregar-producto',
        component: AddProductComponent,
        data: {
          title: "Agregar Productos",
          breadcrumb: "Agregar Producto"
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
