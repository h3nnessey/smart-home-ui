import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from '@shared/config/app-routes';

@Injectable({
  providedIn: 'root',
})
export class AppRouter {
  private readonly router = inject(Router);

  public get navigate() {
    return {
      toLogin: (replaceUrl = true) =>
        this.router.navigate([AppRoutes.Login], { replaceUrl }),
      toDashboard: (replaceUrl = true) =>
        this.router.navigate([AppRoutes.Dashboard.Root], { replaceUrl }),
      byPath: (path: string[], replaceUrl = true) =>
        this.router.navigate(path, { replaceUrl }),
      conditionally: (path: string[] = []) => {
        const targetUrl = this.router.createUrlTree(path).toString();

        if (this.router.url !== targetUrl) {
          this.router.navigate(path, { replaceUrl: true });
        }
      },
    };
  }

  public get urlTree() {
    return {
      login: () => this.router.createUrlTree([AppRoutes.Login]),
    };
  }

  public includes(path: string) {
    return this.router.url.includes(path);
  }
}
