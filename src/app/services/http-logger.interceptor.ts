import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class HttpLoggerInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const start = performance.now();
    console.log('[HTTP] Request', req.method, req.urlWithParams);

    const modifiedReq = req.clone({
     setHeaders: {
        'Authorization': 'Bearer MyCustomHeaderValue',
      },
    });

    return next.handle(modifiedReq).pipe(
      tap({
        next: (event) => {
          /* no-op */
        },
        error: (error) => {
          console.warn('[HTTP] Error', req.method, req.urlWithParams, error);
        },
        complete: () => {
          const duration = performance.now() - start;
          console.log('[HTTP] Completed', req.method, req.urlWithParams, `in ${duration.toFixed(1)}ms`);
        },
      })
    );
  }
}
