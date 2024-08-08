import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/shared/service/productos/productos.service';
import { productDB } from 'src/app/shared/tables/product-list';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  urlApi = environment.apiBaseUrl

  product_list: any[] = [];

  constructor(private productoService: ProductosService) { }

  ngOnInit(): void {
    this.listarProductos();
  }

  //Metodo listar todos los productos
  listarProductos(){
    this.productoService.getAllProductos().subscribe(
      (data: any) => {
        this.product_list = data.map((product: any) => {
          return {
            ...product,
            img_url: product.imagen_producto && product.imagen_producto.length > 0 ? product.imagen_producto[0].imagen_url : 'path/to/default/image.jpg'
          };
        });
        console.log(this.product_list); // Verifica los datos en la consola
      },
      error => {
        console.error('Error al obtener productos', error);
      }
    );
  }


  //Metodo
  deleteProducto(prod_id: number): void{
    Swal.fire({
      title: '¿Estás seguro de eliminar este producto?',
      text: 'Esta acción es irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#fc5c04',
      cancelButtonColor: '#000',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.eliminarProducto(prod_id)
          .subscribe(
            (response) => {
              // Manejar respuesta exitosa (eliminación exitosa)
              Swal.fire({
                title: '¡Producto eliminado!',
                text: response.mensaje,
                icon: 'success',
                confirmButtonColor: '#fc5c04'
              });
              // Actualizar la lista de productos en la vista
              this.listarProductos();
            },
            (error) => {
              let errorMessage = '';
              //Verificar si el mensaje error es un array de lo contrario solo accedemos a el sin array
              if (error.error && error.error.message) {
                if (Array.isArray(error.error.message)) {
                  errorMessage = error.error.message[0];
                } else {
                  errorMessage = error.error.message;
                }
              }
              Swal.fire({
                title: 'Error al eliminar el producto',
                text: errorMessage,
                icon: 'error',
                confirmButtonColor: '#fc5c04'
              });
            }
          );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelado',
          text: 'Producto a salvo',
          icon: 'error',
          confirmButtonColor: '#fc5c04'  // Cambia el color del botón "OK" cuando se cancela
        });
      }
    });
  }
}
