import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() { }


  getBoundsLimit(){ //   
      return  new L.LatLngBounds(new L.LatLng(38.74,-5.15), new L.LatLng(51.2,10.74));
  }

  L():any{
      return L;
  };

  latlng(lat,lng):any{
      return new L.LatLng(lat,lng);
  };

  newMap(id:string,opt:any):any{
    return  new L.Map(id,opt);
  }
}
