import { Injectable } from '@angular/core';
import { MOCK_DATA } from '@/shared/mocks/mock-data';

@Injectable({
  providedIn: 'root',
})
export class TabsState {
  public getTabs() {
    return MOCK_DATA;
  }
}
