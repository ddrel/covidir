import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = environment.rest;
  constructor(private http:HttpClient) { }

  private getHttp(url:string) {
    let promise = new Promise((resolve, reject) => {
        const httpOptions = {
          headers: new HttpHeaders({ "Content-Type": "application/json"})
        };
        this.http.get(url,httpOptions).subscribe(data => {
            resolve(data);
        }, err => {
            reject(err);
        });
    });
    return promise;
  }


  public getgeoJsonNCR(){
    return this.getHttp(`${this.baseUrl}/covid/get_brgy_status_ncr`)
  }

  public getIRperCityNCR(city){
    return this.getHttp(`${this.baseUrl}/covid/get_ir_percity_ncr?city=${city}`)
  }  

  public getgeoJsonDavao(){
    return this.getHttp(`${this.baseUrl}/covid/get_brgy_status_davao`)
  }

  public getIRperCityDavao(city){
    return this.getHttp(`${this.baseUrl}/covid/get_ir_percity_davao?city=${city}`)
  }
  
  public getgeoJsonCaraga(){
    return this.getHttp(`${this.baseUrl}/covid/get_brgy_status_caraga`)
  }

  public getIRperCityCaraga(city){
    return this.getHttp(`${this.baseUrl}/covid/get_ir_percity_caraga?city=${city}`)
  }

  public getgeoJsonRegion3(){
    return this.getHttp(`${this.baseUrl}/covid/get_brgy_status_region3`)
  }

  public getIRperCityRegion3(city){
    return this.getHttp(`${this.baseUrl}/covid/get_ir_percity_region3?city=${city}`)
  }

  public getgeoJsonRegion4A(){
    return this.getHttp(`${this.baseUrl}/covid/get_brgy_status_region4a`)
  }

  public getIRperCityRegion4A(city){
    return this.getHttp(`${this.baseUrl}/covid/get_ir_percity_region4a?city=${city}`)
  }

  public getgeoJsonRegion7(){
    return this.getHttp(`${this.baseUrl}/covid/get_brgy_status_region7`)
  }

  public getIRperCityRegion7(city){
    return this.getHttp(`${this.baseUrl}/covid/get_ir_percity_region7?city=${city}`)
  }

}
