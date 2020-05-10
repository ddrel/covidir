import { Component, OnInit,AfterViewInit} from '@angular/core';
import { MapService } from '../services/map.service';
import { ApiService } from '../services/api.service';
import { DownloadService } from '../services/download.service';
import * as esri from 'esri-leaflet';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,AfterViewInit {
    map;
    mapInfo;
    geoJson;
    selectedCity="0";
    selectedRegion="Metropolitan Manila";
    dataIR = [];
    dataIRTotal = {population:0,suspect:0,probable:0,confirmed:0,total:0}
    public pieChartOptions: ChartOptions = {
      responsive: true,
      // We use these empty structures as placeholders for dynamic theming.
      scales: { xAxes: [{}], yAxes: [{}] },
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end',
        }
      }
    };
    public pieChartDataTrend: ChartDataSets[] = [{ data: [], label: 'Series A' }];
    public pieChartPlugins = [pluginDataLabels] 
    public pieChartColorTrend = [{backgroundColor:["#f8fc03","#fc9003","#c7040a"]}]

  onRegionChangeZoom(r){    
    if(r=="Metropolitan Manila"){
      this.map.setView([14.642838, 121.028872], 12)
    }else if(r=="Region XI Davao"){
      this.map.setView([7.127068075968437, 125.66687046185041], 11)
    }else if(r=="Region XIII Caraga"){
      this.map.setView([7.748988711210366,125.98814604620074], 10)
    }else if(r=="Region III Central Luzon"){
      this.map.setView([15.401720, 120.477081], 10)
    }else if(r=="Region IV-A CALABARZON"){
      this.map.setView([14.218369, 121.506398],10)
    }else if(r=="Region VII Central Visayas"){
      this.map.setView([10.141664, 123.616154],10)      
    }

    
    
  }
  getRegion(){
    return ["Metropolitan Manila","Region III Central Luzon","Region IV-A CALABARZON","Region VII Central Visayas","Region XI Davao","Region XIII Caraga"]
  }
   getCities(region){
    return {"Region XIII Caraga":
        ["Barobo",
        "Bayabas",
        "Bislig City",
        "Cagawit",
        "Cantilan",
        "Carmen",
        "Carrascal",
        "Cortes",
        "Hinatuan",
        "Lanuza",
        "Lianga",
        "Lingig",
        "Madrid",
        "Marihatag",
        "San Agustin",
        "San Miguel",
        "Tagbina",
        "Tago",
        "Tandag City",
        "Surigao del Norte",
        "Dinagat",
        "Bayugan City",
        "Bunawan",
        "Esperanza",
        "La Paz",
        "Loreto",
        "Prosperidad",
        "Rosario",
        "San Francisco",
        "San Luis",
        "Santa Josefa",
        "Sibagat",
        "Talacogon",
        "Trento",
        "Veruela",
        "Buenavista",
        "Butuan City",
        "Cabadbaran City",
        "Jabonga",
        "Kitcharao",
        "Las Nieves",
        "Magallanes",
        "Nasipit",
        "Romualdez",
        "Santiago",
        "Tubay"],
      "Region XI Davao":
      ["Compostela",
      "Laak",
      "Mabini",
      "Maco",
      "Maragusan",
      "Mawab",
      "Monkayo",
      "Montevista",
      "Nabunturan",
      "New Bataan",
      "Pantukan",
      "Baganga",
      "Banaybanay",
      "Boston",
      "Caraga",
      "Cateel",
      "Governor Generoso",
      "Lupon",
      "Manay",
      "Mati City",
      "San Isidro",
      "Tarragona",
      "Don Marcelino",
      "Jose Abad Santos",
      "Malita",
      "Santa Maria",
      "Sarangani",
      "Bansalan",
      "Davao City",
      "Digos City (Capital)",
      "Hagonoy",
      "Kiblawan",
      "Magsaysay",
      "Malalag",
      "Matanao",
      "Padada",
      "Santa Cruz",
      "Sulop",
      "Asuncion",
      "Braulio E. Dujali",
      "Carmen",
      "Samal",
      "Kapalong",
      "New Corella",
      "Panabo City",
      "Santo Tomas",
      "Tagum City (Capital)",
      "Talaingod"],
     "Metropolitan Manila":
     ["Kalookan",
     "Las Piñas",
     "Makati",
     "Malabon",
     "Mandaluyong",
     "Manila",
     "Marikina",
     "Muntinlupa",
     "Navotas",
     "Parañaque",
     "Pasay",
     "Pasig",
     "Pateros",
     "Quezon City",
     "San Juan",
     "Taguig",
     "Valenzuela"],
     "Region III Central Luzon":
     ["Botolan",
      "Cabangan",
      "Candelaria",
      "Castillejos",
      "Iba     ",
      "Masinloc",
      "Olongapo City",
      "Palauig",
      "San Antonio",
      "San Felipe",
      "San Marcelino",
      "San Narciso",
      "Santa Cruz",
      "Subic",
      "Anao",
      "Bamban",
      "Camiling",
      "Capas",
      "Concepcion",
      "Gerona",
      "La Paz",
      "Mayantoc",
      "Moncada",
      "Paniqui",
      "Pura",
      "Ramos",
      "San Clemente",
      "San Jose",
      "San Manuel",
      "Santa Ignacia",
      "Tarlac City",
      "Victoria",
      "Angeles City",
      "Apalit",
      "Arayat",
      "Bacolor",
      "Candaba",
      "Floridablanca",
      "Guagua",
      "Lubao",
      "Mabalacat City",
      "Macabebe",
      "Magalang",
      "Masantol",
      "Mexico",
      "Minalin",
      "Porac",
      "San Fernando City",
      "San Luis",
      "San Simon",
      "Santa Ana",
      "Santa Rita",
      "Santo Tomas",
      "Sasmuan",
      "Aliaga",
      "Bongabon",
      "Cabanatuan City",
      "Cabiao",
      "Carranglan",
      "Cuyapo",
      "Gabaldon",
      "Gapan City",
      "General Tinio",
      "Guimba",
      "Jaen",
      "Laur",
      "Licab",
      "Llanera",
      "Lupao",
      "Nampicuan",
      "Natividad",
      "Palayan City",
      "Pantabangan",
      "Penaranda",
      "Quezon",
      "Rizal",
      "San Isidro",
      "San Jose City",
      "San Leonardo",
      "Santa Rosa",
      "Santo Domingo",
      "Science City of Munoz",
      "Talavera",
      "Talugtug",
      "Zaragoza",
      "Angat",
      "Balagtas ",
      "Baliuag",
      "Bocaue",
      "Bulacan",
      "Bustos",
      "Calumpit",
      "Guiguinto",
      "Hagonoy",
      "Malolos City",
      "Marilao",
      "Meycauayan City",
      "Norzagaray",
      "Obando",
      "Pandi",
      "Paombong",
      "Plaridel",
      "Pulilan",
      "San Ildefonso",
      "San Jose del Monte",
      "San Miguel",
      "San Rafael",
      "Santa Maria",
      "Trinidad",
      "Abucay",
      "Bagac",
      "Balanga City",
      "Dinalupihan",
      "Hermosa",
      "Limay",
      "Mariveles",
      "Morong",
      "Orani",
      "Orion",
      "Pilar",
      "Samal",
      "Baler ",
      "Casiguran",
      "Dilasag",
      "Dinalungan",
      "Dingalan",
      "Dipaculao",
      "Maria Aurora"],
      "Region IV-A CALABARZON":
      ["Antipolo City",
      "Angono",
      "Baras",
      "Binangonan",
      "Cainta",
      "Cardona",
      "Jala-Jala",
      "Morong",
      "Pililla",
      "Rodriguez",
      "San Mateo",
      "Tanay",
      "Taytay",
      "Teresa",
      "Agdangan",
      "Alabat",
      "Atimonan",
      "Buenavista",
      "Burdeos",
      "Calauag",
      "Candelaria",
      "Catanauan",
      "Dolores",
      "General Luna",
      "General Nakar",
      "Guinayangan",
      "Gumaca",
      "Infanta",
      "Jomalig",
      "Lopez",
      "Lucban",
      "Lucena City",
      "Macalelon",
      "Mauban",
      "Mulanay",
      "Padre Burgos",
      "Pagbilao",
      "Panukulan",
      "Patnanungan",
      "Perez",
      "Pitogo",
      "Plaridel",
      "Polillo",
      "Quezon",
      "Real",
      "Sampaloc",
      "San Andres",
      "San Antonio",
      "San Francisco",
      "San Narciso",
      "Sariaya",
      "Tagkawayan",
      "Tayabas City",
      "Tiaong",
      "Unisan",
      "Alaminos",
      "Bay",
      "Binan City",
      "Cabuyao City",
      "Calamba City",
      "Calauan",
      "Cavinti",
      "Famy",
      "Kalayaan",
      "Liliw",
      "Los Banos",
      "Luisiana",
      "Lumban",
      "Mabitac",
      "Magdalena",
      "Majayjay",
      "Nagcarlan",
      "Paete",
      "Pagsanjan",
      "Pakil",
      "Pangil",
      "Pila",
      "Rizal",
      "San Pablo City",
      "San Pedro City",
      "Santa Cruz",
      "Santa Maria",
      "Santa Rosa City",
      "Siniloan",
      "Victoria",
      "Aguinaldo",
      "Alfonso",
      "Amadeo",
      "Bacoor City",
      "Carmona",
      "Cavite City",
      "Dasmarinas City",
      "Gen. Mariano Alvarez",
      "General Trias City",
      "Imus City",
      "Indang",
      "Kawit",
      "Magallanes",
      "Maragondon",
      "Mendez",
      "Naic",
      "Noveleta",
      "Rosario",
      "Silang",
      "Tagaytay City",
      "Tanza",
      "Ternate",
      "Trece Martires",
      "Agoncillo",
      "Alitagtag",
      "Balayan",
      "Balete",
      "Batangas City",
      "Bauan",
      "Calaca",
      "Calatagan",
      "Cuenca",
      "Ibaan",
      "Laurel",
      "Lemery",
      "Lian",
      "Lipa City",
      "Lobo",
      "Mabiini",
      "Malvar",
      "Mataas na Kahoy",
      "Nasugbu",
      "Padre Garcia",
      "San Jose",
      "San Juan",
      "San Luis",
      "San Nicolas",
      "San Pascual",
      "Santa Teresita",
      "Santo Tomas",
      "Taal",
      "Talisay",
      "Tanauan City",
      "Taysan",
      "Tingloy",
      "Tuy"],
      "Region VII Central Visayas":
      ["Enrique Villanueva",
      "Larena",
      "Lazi",
      "Maria",
      "San Juan",
      "Siquijor ",
      "Amlan",
      "Ayungon",
      "Bacong",
      "Bais City",
      "Basay",
      "Bayawan City",
      "Bindoy",
      "Canlaon City",
      "Daquin",
      "Dumaguete City",
      "Guihulngan",
      "Jimalalud",
      "La Libertad",
      "Mabinay",
      "Manjuyod",
      "Pamplona",
      "San Jose",
      "Santa Catalina",
      "Siaton",
      "Sibulan",
      "Tanjay City",
      "Tayasan",
      "Valencia",
      "Vallehermoso",
      "Zamboanguita",
      "Alcantara",
      "Alcoy",
      "Alegria",
      "Aloguinsan",
      "Argao",
      "Asturias",
      "Badian",
      "Balamban",
      "Bantayan",
      "Barili",
      "Bogo City",
      "Boljoon",
      "Borbon",
      "Carcar City",
      "Carmen",
      "Catmon",
      "Cebu City ",
      "Compostela",
      "Consolacion",
      "Cordova",
      "Daanbantayan",
      "Dalaguete",
      "Danao City",
      "Dumanjug",
      "Ginatilan",
      "Lapu-Lapu City",
      "Liloan",
      "Madellin",
      "Madridejos",
      "Malabuyoc",
      "Mandaue City",
      "Minglanilla",
      "Moalboal",
      "Naga City",
      "Oslob",
      "Pilar",
      "Pinamungajan",
      "Poro",
      "Ronda",
      "Samboan",
      "San Fernando",
      "San Francisco",
      "San Remigio",
      "Santa Fe",
      "Santander",
      "Sibonga",
      "Sogod",
      "Tabogon",
      "Tabuelan",
      "Talisay City",
      "Toledo City",
      "Tuburan",
      "Tudela",
      "Alburquerque",
      "Alicia",
      "Anda",
      "Antequera",
      "Baclayon",
      "Balilihan",
      "Batuan",
      "Bien Undo",
      "Bilar",
      "Buenavista",
      "Calape",
      "Candijay",
      "Catigbian",
      "Clarin",
      "Corella",
      "Cortes",
      "Dagohoy",
      "Danao",
      "Dauis",
      "Dimiao",
      "Duero",
      "Garcia",
      "Garcia Hernandez",
      "Jetafe",
      "Guindulman",
      "Inabanga",
      "Jagna",
      "Lila",
      "Loay",
      "Loboc",
      "Loon",
      "Mabini",
      "Maribojoc",
      "Panglao",
      "Sagbayan",
      "San Isidro",
      "San Miguel",
      "Sevilla",
      "Sierra Bullones",
      "Sikatuna",
      "Tagbilaran City ",
      "Talibon",
      "Trinidad",
      "Tubigon",
      "Ubay"

      ]
    }[region]
   } 
  constructor(private mapService:MapService,private apiService:ApiService,private downloadService:DownloadService) { }

  ngOnInit() {
  }

  highlightFeature(e){
    let layer = e.target;

    layer.setStyle({
        weight: 2,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!this.mapService.L().Browser.ie && !this.mapService.L().Browser.opera && !this.mapService.L().Browser.edge) {
        layer.bringToFront();
    }

    this.mapInfo.update(layer.feature.properties);
  }
  resetHighlight(e){
    this.geoJson.resetStyle(e.target);
    this.mapInfo.update();
  }

  zoomToFeature(e){
    this.map.fitBounds(e.target.getBounds());
    this.mapInfo.update(e.target.feature.properties);
  }
  onEachFeature(feature, layer){
    layer.on({
      mouseover: (e)=>this.highlightFeature(e),
      mouseout: (e)=>this.resetHighlight(e),
      click: (e)=>this.zoomToFeature(e)
  });
  }

  getColor(status){
    let color = "#07a626";
    if(status==1){
      color="#f8fc03";
    }else if(status==2){
      color="#f09b13";
    }else if(status==3){
      color="#c20f02";
    }
    return color;
  }

  ngAfterViewInit(){
    let esri_world = this.mapService.L().tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}');
    let mapbox = this.mapService.L().tileLayer("https://{s}.tiles.mapbox.com/v4/feelcreative.llm8dpdk/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZmVlbGNyZWF0aXZlIiwiYSI6Ik1Gak9FXzAifQ.9eB142zVCM4JMg7btDDaZQ");
    let osm = this.mapService.L().tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
    let World_Dark_Gray_Base = esri.tiledMapLayer({
      url: 'https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer'
      });

    let base_maps = {
                    "Esri World": esri_world,
                    "Mapbox": mapbox,
                    "osm": osm,
                    "Esri Dark Gray":World_Dark_Gray_Base
                  };

    this.map =  this.mapService.newMap("covidmap",{
                                            layers:[mapbox],
                                            center: [14.642838, 121.028872],                                                                                        
                                            zoom:12,
                                            minZoom:7
                                            });    

    //this.map.on("click",(e)=>{console.log(e)})                                            
    let layerControl = this.mapService.L().control.layers( base_maps,null,{ position: 'topleft' });
    layerControl.addTo(this.map); 
    let _featureLayer = (f)=>{
      let color = "#07a626";
      if(f.properties.status==1){
        color="#f8fc03";
      }else if(f.properties.status==2){
        color="#f09b13";
      }else if(f.properties.status==3){
        color="#c20f02";
      }
      return {
            fillColor: color,
            weight: 1,
            opacity: 1,
            color: 'white',
            dashArray: '1',
            fillOpacity: 0.7
          };
      }
    
    //NCR  
    this.apiService.getgeoJsonNCR().then((geoJson:any)=>{
      this.geoJson = this.mapService.L().geoJSON(geoJson, {style: _featureLayer
    ,onEachFeature: (feature, layer)=>{this.onEachFeature(feature, layer)}}).addTo(this.map)
    });
    //Davao
    this.apiService.getgeoJsonDavao().then((geoJson:any)=>{
      this.geoJson = this.mapService.L().geoJSON(geoJson, {style: _featureLayer
    ,onEachFeature: (feature, layer)=>{this.onEachFeature(feature, layer)}}).addTo(this.map)
    });
    //Caraga
    this.apiService.getgeoJsonCaraga().then((geoJson:any)=>{
      this.geoJson = this.mapService.L().geoJSON(geoJson, {style: _featureLayer
    ,onEachFeature: (feature, layer)=>{this.onEachFeature(feature, layer)}}).addTo(this.map)
    });
    //Region3
    this.apiService.getgeoJsonRegion3().then((geoJson:any)=>{
      this.geoJson = this.mapService.L().geoJSON(geoJson, {style: _featureLayer
    ,onEachFeature: (feature, layer)=>{this.onEachFeature(feature, layer)}}).addTo(this.map)
    });
    //Region4A
    this.apiService.getgeoJsonRegion4A().then((geoJson:any)=>{
      this.geoJson = this.mapService.L().geoJSON(geoJson, {style: _featureLayer
    ,onEachFeature: (feature, layer)=>{this.onEachFeature(feature, layer)}}).addTo(this.map)
    });
    //Region7
    this.apiService.getgeoJsonRegion7().then((geoJson:any)=>{
      this.geoJson = this.mapService.L().geoJSON(geoJson, {style: _featureLayer
    ,onEachFeature: (feature, layer)=>{this.onEachFeature(feature, layer)}}).addTo(this.map)
    });



    this.mapInfo = this.mapService.L().control();
    this.mapInfo.onAdd =  (e)=> {
      this.mapInfo._div = this.mapService.L().DomUtil.create('div', 'info'); // create a div with a class "info"
      this.mapInfo.update()
      return this.mapInfo._div
    };
    
    // method that we will use to update the control based on feature properties passed
    this.mapInfo.update =  (props)=> {


      this.mapInfo._div.innerHTML = '<h6>Barangay Covid Incidence</h6>' +  (props ? 
        '<b>Barangay : </b>' + props.barangay + '<br />' +
        '<b>City : </b>' + props.muncity + '<br />' +
        '<b>Population :</b>' + props.population + '<br />' +
        '<p>------------------------------------------</p>' +
        '<b>Suspected : </b>' + props.suspect + '<br />' +
        '<b>Probable : </b>' + props.probable + '<br />' +
        '<b>Confirmed : ' + props.confirmed + '</b><br />' +
        '<p>------------------------------------------</p>' +
        '<b>Total : ' + props.total + '</b><br />' +
        '<p>------------------------------------------</p>' +       
        '<b>IR : ' + (typeof props.ir =="undefined"?0:props.ir).toFixed(2) || 0 + '</b>'
        : 'Hover over barangay');    
    };
    
    this.mapInfo.addTo(this.map);

  }
  onRegionChange(e){
    this.selectedRegion=e;
  }
  onCityChange(e,selectedRegion){
    this.selectedCity=e;
    if(e!=0){
      let apigetCity =this.apiService.getIRperCityNCR(e)      
      
      if(selectedRegion=="Region XI Davao"){
        apigetCity = this.apiService.getIRperCityDavao(e)
      }else if (selectedRegion=="Region XIII Caraga"){
        apigetCity = this.apiService.getIRperCityCaraga(e)
      }else if(selectedRegion=="Region III Central Luzon"){
        apigetCity = this.apiService.getIRperCityRegion3(e)
      }else if(selectedRegion=="Region IV-A CALABARZON"){
        apigetCity = this.apiService.getIRperCityRegion4A(e)
      }else if(selectedRegion=="Region VII Central Visayas"){
        apigetCity = this.apiService.getIRperCityRegion7(e)
      }

      apigetCity.then((data:any)=>{       
        this.dataIR = data.map(d=>{        
        return {barangay:d.barangay,
                population:d.population,
                suspect:d.suspect,
                probable:d.probable,
                confirmed:d.confirmed,
                status:d.status,
                total:d.total,
                ir: d.ir? d.ir.toFixed(2):0
              }
          });         
          this.dataIRTotal.population = data.map(d=>d.population?parseInt(d.population):0).reduce((a,b)=>{return a + b});
          this.dataIRTotal.suspect = data.map(d=>d.suspect).reduce((a,b)=>{return a + b});
          this.dataIRTotal.probable = data.map(d=>d.probable).reduce((a,b)=>{return a + b});
          this.dataIRTotal.confirmed = data.map(d=>d.confirmed).reduce((a,b)=>{return a + b});
          this.dataIRTotal.total = data.map(d=>d.total).reduce((a,b)=>{return a + b});
 
          this.pieChartDataTrend = [{ data: [this.dataIRTotal.suspect,
                                              this.dataIRTotal.probable,
                                              this.dataIRTotal.confirmed], label: `${e} Covid Status` }];
      });
      
    }
  }

  donwloadCovidStatus(city,region){    
    if(region=="Metropolitan Manila"){
      this.downloadService.covidStatusNCR(city)
    }else if(region=="Region XI Davao"){
      this.downloadService.covidStatusDavao(city)
    }else if(region=="Region XIII Caraga"){
      this.downloadService.covidStatusCaraga(city)
    }else if(region=="Region III Central Luzon"){
      this.downloadService.covidStatusRegion3(city)
    }else if(region=="Region IV-A CALABARZON"){
      this.downloadService.covidStatusRegion4A(city)
    }else if(region=="Region VII Central Visayas"){
      this.downloadService.covidStatusRegion7(city)
    }
    
  }
}
