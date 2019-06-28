import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserClaims } from '../registration/User';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    requestCount = 0;
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser: UserClaims;
        this.authService.currentUser.subscribe((userClain: UserClaims) => currentUser = userClain);
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }
        this.incrementRequest();
        return next.handle(request).pipe(map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                this.decrementRequest();
            }
            return event;
        }), catchError((error: HttpErrorResponse) => {
            this.decrementRequest();
            return throwError(error);
        }));
    }

    private incrementRequest(): void {
        this.requestCount++;
        this.authService.showSpinnerSubject.next(this.requestCount);
    }

    private decrementRequest(): void {
        this.requestCount--;
        this.authService.showSpinnerSubject.next(this.requestCount);
    }
}
