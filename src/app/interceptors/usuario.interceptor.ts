import { Injectable, Input } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HTTP_INTERCEPTORS,
    HttpErrorResponse
} from '@angular/common/http';
import { TokenService } from '../shared/service/token.service';
import { AuthService } from '../shared/service/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable, catchError, concatMap, throwError } from 'rxjs';
import { TokenDto } from '../models/token.dto';


const AUTHORIZATION = 'Authorization';
const BEARER = 'Bearer ';

@Injectable()
export class UsuarioInterceptor implements HttpInterceptor {


    constructor(private tokenService: TokenService,
        private authService: AuthService,
        private router: Router) {
        this.checkInactivity();
    }

    private lastInteractionTime: Date;

    private checkInactivity() {
        // Función para verificar la inactividad cada cierto intervalo de tiempo
        setInterval(() => {
            const currentTime = new Date();
            const timeDifference = currentTime.getTime() - this.lastInteractionTime.getTime();
            const maxInactiveTime = 15 * 60 * 1000; // 15 minutos en milisegundos

            if (timeDifference > maxInactiveTime && this.tokenService.isLogged()) {
                // Realizar las acciones necesarias para cerrar la sesión
                this.tokenService.logOut();
                // Mostrar la alerta usando SweetAlert
                Swal.fire({
                    icon: 'warning',
                    title: '¡Sesión expirada!',
                    text: 'Tu sesión ha expirado debido a la inactividad.',
                    confirmButtonColor: '#fc5c04'
                }).then((result) => {
                    location.reload()
                });

            }
        }, 1000); // Verificar cada segundo
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        this.lastInteractionTime = new Date(); // Registrar la última interacción

        if (!this.tokenService.isLogged()) {
            return next.handle(request);
        }
        let intReq = request;
        const token = this.tokenService.getToken();
        intReq = this.addToken(request, token);
        return next.handle(intReq).pipe(catchError((err: HttpErrorResponse) => {
            if (err.status === 401) {
                const dto: TokenDto = new TokenDto(token);
                return this.authService.refresh(dto).pipe(concatMap((data: any) => {
                    console.log('refreshing...');
                    this.tokenService.setToken(data.token);
                    intReq = this.addToken(request, data.token);
                    return next.handle(intReq);
                }));
            } else {
                // this.tokenService.logOut();
                return throwError(err);
            }
        }));
    }

    private addToken(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
        return request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }
}

export const interceptorProvider = [{ provide: HTTP_INTERCEPTORS, useClass: UsuarioInterceptor, multi: true }];