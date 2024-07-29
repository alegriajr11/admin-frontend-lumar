import { Injectable, HostListener, Inject } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { WINDOW } from "./windows.service";
// Menu
export interface Menu {
	path?: string;
	title?: string;
	icon?: string;
	type?: string;
	badgeType?: string;
	badgeValue?: string;
	active?: boolean;
	bookmark?: boolean;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService {

	public screenWidth: any
	public collapseSidebar: boolean = false

	constructor(@Inject(WINDOW) private window) {
		this.onResize();
		if (this.screenWidth < 991) {
			this.collapseSidebar = true
		}
	}

	// Windows width
	@HostListener("window:resize", ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}

	MENUITEMS: Menu[] = [
		{
			path: '/dashboard/default', title: 'Panel', icon: 'home', type: 'link', badgeType: 'primary', active: false
		},
		{
			title: 'Productos', icon: 'box', type: 'sub', active: false, children: [
				{ path: '/productos/seccion', title: 'Seccion', type: 'link' },
				{ path: '/productos/categoria', title: 'Categoria', type: 'link' },
				{ path: '/productos/sub-categoria', title: 'Sub Categoria', type: 'link' },
				{ path: '/productos/producto-lista', title: 'Lista de Productos', type: 'link' },
				//{ path: '/products/product-detail', title: 'Product Detail', type: 'link' },
				{ path: '/productos/agregar-producto', title: 'Agregar Producto', type: 'link' },
			]
		},
		{
			title: 'Ventas', icon: 'dollar-sign', type: 'sub', active: false, children: [
				{ path: '/ventas/orders', title: 'Ordenes', type: 'link' },
				{ path: '/ventas/transactions', title: 'Transacciones', type: 'link' },
			]
		},
		{
			title: 'Cupones', icon: 'tag', type: 'sub', active: false, children: [
				{ path: '/coupons/list-coupons', title: 'Lista de Cupones', type: 'link' },
				{ path: '/coupons/create-coupons', title: 'Crear Cupón', type: 'link' },
			]
		},
		// {
		// 	title: 'Pages', icon: 'clipboard', type: 'sub', active: false, children: [
		// 		{ path: '/pages/list-page', title: 'List Page', type: 'link' },
		// 		{ path: '/pages/create-page', title: 'Create Page', type: 'link' },
		// 	]
		// },
		// {
		// 	title: 'Media', path: '/media', icon: 'camera', type: 'link', active: false
		// },
		{
			title: 'Menus', icon: 'align-left', type: 'sub', active: false, children: [
				{ path: '/menus/list-menu', title: 'Lista de Menus', type: 'link' },
				{ path: '/menus/create-menu', title: 'Crear Menu', type: 'link' },
			]
		},
		{
			title: 'Usuarios', icon: 'user-plus', type: 'sub', active: false, children: [
				{ path: '/users/list-user', title: 'Lista de Usuarios', type: 'link' },
				{ path: '/users/create-user', title: 'Crear Usuario', type: 'link' },
			]
		},
		// {
		// 	title: 'Vendors', icon: 'users', type: 'sub', active: false, children: [
		// 		{ path: '/vendors/list-vendors', title: 'Vendor List', type: 'link' },
		// 		{ path: '/vendors/create-vendors', title: 'Create Vendor', type: 'link' },
		// 	]
		// },
		{
			title: 'Reportes', path: '/reports', icon: 'bar-chart', type: 'link', active: false
		},
		{
			title: 'Configuración', icon: 'settings', type: 'sub', children: [
				{ path: '/settings/profile', title: 'Perfil', type: 'link' },
			]
		},
		{
			title: 'Pedidos', path: '/pedidos', icon: 'archive', type: 'link', active: false
		},

	]
	// Array
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);


}
