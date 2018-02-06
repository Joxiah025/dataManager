import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { Storage } from '@ionic/storage';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  public url = "http://datamanager.excellentexchangers.com/api/";
  
  constructor(public http: HttpClient, public storage: Storage) {
    // console.log('Hello DataProvider Provider');   
    // this.storage.remove('contact'); 
  }

  getLocalEvent(){
    return this.storage.get('events').then(
      (res) => {
        return res
      }
    );
  }

  saveEvents(data: any): Promise<any>{
    console.log(data);
    return this.storage.set('events', data);
  }

  getEvents(): Observable<any>{
    return this.http.get(this.url+'events')
    .map(res => {
      this.saveEvents(res);
      return res
    })
    .catch( (err) => {
      return this.getLocalEvent();
    })
  }

  saveFt(data: any): Promise<any>{
    console.log(data);
    return this.storage.set('contact', data);
  }

  getFt(): Promise<any>{
    return this.storage.get('contact').then(
      (res) => {
        return res
      }
    );
  }


  getUser(): Promise<any>{
    return this.storage.get('user').then(
      (res) => {
        return res
      }
    );
  }


  saveUser(data: any): Promise<any>{
    console.log(data);
    return this.storage.set('user', data);
  }

  uploadContact(user: any,contact: any,pic: any): Observable<any>{
    let data = {user: user, contact: contact, pic: pic}
    return this.http.post(this.url+'report',data)
    .map(res => {
      return res
    })
    .catch( (err) => {
      return err
    })
  }

}
