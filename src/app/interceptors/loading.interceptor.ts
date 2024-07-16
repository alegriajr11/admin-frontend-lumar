import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { Observable, finalize } from "rxjs";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

    constructor(private _ngxUiLoaderService: NgxUiLoaderService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this._ngxUiLoaderService.start();
        return next.handle(req).pipe(finalize(() => this._ngxUiLoaderService.stop()))
    }

}