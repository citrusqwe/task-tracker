import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  getUserAvatar(name: string) {
    return this.http.get(`https://ui-avatars.com/api/?name=${name}&background=random`)
  }
}
