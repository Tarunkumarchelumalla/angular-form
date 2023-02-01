import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface emp {
  Name: string;
  email: string;
}
@Injectable()
export class AppServiceService {
  public configUrl = 'https://random-data-api.com/api/v2/users';

  constructor(private http: HttpClient) {}
  getConfig() {
    return this.http.get<emp[]>(this.configUrl);
  }
}
