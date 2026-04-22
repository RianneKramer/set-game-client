import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

export function authInterceptor(req: HttpRequest<any>, next: HttpHandlerFn) {
  const token = localStorage.getItem('authToken');

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  }
  return next(req);
}
