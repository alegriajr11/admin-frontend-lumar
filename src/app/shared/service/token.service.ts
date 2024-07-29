import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private jwtHelper = new JwtHelperService();

  roleAs: string;

  constructor() { }

  isLogged(): boolean {
    const token = this.getToken();
    if (token) {
      // Verifica si el token es válido y no ha expirado
      if (this.isValidToken(token) && !this.jwtHelper.isTokenExpired(token)) {
        return true;
      } else {
        // Elimina el token si es inválido o ha expirado
        this.logOut();
      }
    }
    return false;
  }

  private isValidToken(token: string): boolean {
    // Verifica que el token tenga tres partes separadas por puntos
    return token.split('.').length === 3;
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getNombreUsuario(): string {
    if (!this.isLogged()) {
      return null;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const usu_nombreUsuario = valuesJson.usu_nombreUsuario;

    return usu_nombreUsuario;
  }

  //OBTENER EL NOMBRE DEL USAURIO
  getNombre(): string {
    if (!this.isLogged()) {
      return null;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const usu_nombre = valuesJson.usu_nombre;
    return usu_nombre;
  }

  //OBTENER EL ID DEL USUARIO LOGUEADO
  getUserId(): number {
    if (!this.isLogged()) {
      return null;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const usu_id = valuesJson.usu_id;
    return usu_id;
  }

  getRole() {
    const token = this.getToken();
    const payload = token.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const roles = valuesJson.roles;
    this.roleAs = localStorage.getItem(roles);
    return this.roleAs;
  }

  //Rol Administrador
  isAdmin(): boolean {
    if (!this.isLogged()) {
      return null;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const rol = valuesJson.usu_rol;
    if (rol == 'Administrador') {
      return true;
    }
    return false;
  }

  //Rol Soporte
  isSoporte(): boolean {
    if (!this.isLogged()) {
      return null;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const rol = valuesJson.usu_rol;
    if (rol == 'Soporte') {
      return true;
    }
    return false;
  }

  //Rol Vendedor
  isVendedor(): boolean {
    if (!this.isLogged()) {
      return null;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const rol = valuesJson.usu_rol;
    if (rol == 'Vendedor') {
      return true;
    }
    return false;
  }

  //Rol Supervisor
  isSupervisor(): boolean {
    if (!this.isLogged()) {
      return null;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const rol = valuesJson.usu_rol;
    if (rol == 'Supervisor') {
      return true;
    }
    return false;
  }

  logOut(): void {
    localStorage.clear();
  }
}
