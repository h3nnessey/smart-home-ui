import { inject, Injectable } from '@angular/core';
import { TuiAlertService } from '@taiga-ui/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly alerts = inject(TuiAlertService);

  public showError(message: string) {
    return this.alerts.open(`<strong>${message}</strong>`, {
      label: 'Error!',
      appearance: 'negative',
      autoClose: 3000,
    });
  }
}
