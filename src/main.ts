import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { AuthService } from '@services/auth/auth-service';

try {
  const appRef = await bootstrapApplication(App, appConfig);
  const authService = appRef.injector.get(AuthService);

  await authService.initializeAuthState();
} catch (error: unknown) {
  console.error(error);
}
