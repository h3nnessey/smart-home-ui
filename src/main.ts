import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { AuthService } from '@/services/auth-service';

try {
  const appRef = await bootstrapApplication(App, appConfig);

  appRef.injector.get(AuthService).login();
} catch (error: unknown) {
  console.error(error);
}
