import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { config } from '../../configApp';

@Injectable({
  providedIn: 'root'
})
export class AuthServerService {

  private _section = new BehaviorSubject<any>({});
  section_ = this._section.asObservable();

  constructor(private router: Router,private http : HttpClient)
  {
    //
  }


  /**
   * Setter & getter for access X-API-KEY
  */
  set API_KEY(key: any)
  {
    localStorage.setItem('X-API-KEY', key);
  }

  get API_KEY(): any
  {
    return localStorage.getItem('X-API-KEY');
  }

  setKEY(key: any){
    this.API_KEY = key;
  }

  setSection_(section: any) {
    this._section.next(section);
  }
}
