import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilsService } from './utils.service.';

@Injectable()
export class SessionInterceptor implements HttpInterceptor {
    constructor(private utilsService: UtilsService) {}
    intercept(
        request: HttpRequest<any>, next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const voterId: string = localStorage.getItem('voterId') || this.utilsService.createUuid();

        request = request.clone({
            headers: request.headers.set(
                'Authorization',
                voterId
            )
        });

        return next.handle(request);
    }
}