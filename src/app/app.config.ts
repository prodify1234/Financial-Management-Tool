import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth/auth.intreceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
    withInterceptors([authInterceptor])
  ),provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes,withHashLocation())]
};
