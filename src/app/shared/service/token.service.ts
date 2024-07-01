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

  getRole() {
    const token = this.getToken();
    const payload = token.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const usu_nombreUsuario = valuesJson.usu_nombreUsuario;
    const roles = valuesJson.roles;
    this.roleAs = localStorage.getItem(roles);
    return this.roleAs;
  }

  isAdmin(): boolean {
    if (!this.isLogged()) {
      return null;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const usu_nombreUsuario = valuesJson.usu_nombreUsuario;
    const usu_estado = valuesJson.usu_estado;
    const roles = valuesJson.usu_roles;
    if (roles.indexOf('admin') < 0) {
      return false;
    }
    return true;
  }

  logOut(): void {
    localStorage.clear();
  }
}
