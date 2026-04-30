import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginStore } from '../../features/auth/data-access/login.store';
import { catchError, throwError } from 'rxjs';

export function authInterceptor(req: HttpRequest<any>, next: HttpHandlerFn) {
  const token = localStorage.getItem('authToken');
  const loginStore = inject(LoginStore)

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  }
  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401) {
        loginStore.logout();
      }
      return throwError(() => err);
    })
  );
}
