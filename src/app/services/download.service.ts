import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  baseUrl = environment.rest;
  constructor() { }

  public covidStatusNCR = (city=>{
    let link = document.createElement('a');
    link.setAttribute('type', 'hidden');    
    link.href= `${this.baseUrl}/covid/download_covidstatus_ncr?city=${city}`
    document.body.appendChild(link);
    link.click();
    link.remove();
  })

  public covidStatusDavao = (city=>{
    let link = document.createElement('a');
    link.setAttribute('type', 'hidden');    
    link.href= `${this.baseUrl}/covid/download_covidstatus_davao?city=${city}`
    document.body.appendChild(link);
    link.click();
    link.remove();
  });

  public covidStatusCaraga = (city=>{
    let link = document.createElement('a');
    link.setAttribute('type', 'hidden');    
    link.href= `${this.baseUrl}/covid/download_covidstatus_caraga?city=${city}`
    document.body.appendChild(link);
    link.click();
    link.remove();
  });

  public covidStatusRegion3 = (city=>{
    let link = document.createElement('a');
    link.setAttribute('type', 'hidden');    
    link.href= `${this.baseUrl}/covid/download_covidstatus_region3?city=${city}`
    document.body.appendChild(link);
    link.click();
    link.remove();
  });

  public covidStatusRegion4A = (city=>{
    let link = document.createElement('a');
    link.setAttribute('type', 'hidden');    
    link.href= `${this.baseUrl}/covid/download_covidstatus_region4a?city=${city}`
    document.body.appendChild(link);
    link.click();
    link.remove();
  });

  public covidStatusRegion7 = (city=>{
    let link = document.createElement('a');
    link.setAttribute('type', 'hidden');    
    link.href= `${this.baseUrl}/covid/download_covidstatus_region7?city=${city}`
    document.body.appendChild(link);
    link.click();
    link.remove();
  });
}