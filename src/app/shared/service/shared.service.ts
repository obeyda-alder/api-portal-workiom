import { Inject, Injectable, PLATFORM_ID, OnInit, AfterViewChecked } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Lists } from '../components/side-bar/side-bar.types';
import { Projects } from '../components/nav-bar/nav-bar.types';
import { BehaviorSubject, Observable, Subscription, of } from 'rxjs';
import { config } from '../../configApp';
import { NavigationStart, Router } from '@angular/router';
import { HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SharedService{

  private projec$ = new BehaviorSubject<any>({});
  selectProjec$ = this.projec$.asObservable();

  private secton$ = new BehaviorSubject<any>({});
  selectedSecton$ = this.secton$.asObservable();

  public languagesSupportInTerminal: string[] = ['curl', 'PHP-cURL', 'NodeJs'];
  public CompanyName = config.CompanyName;
  public baseUrl = config.apiTerminalUrl;
  public transTo = config.translateTo;
  public logo: string = config.logo;
  public apiKey: string = config.apiKey;
  public Projects: Projects[] = [];
  public ProjectSelected: Projects;

  public Operations : string[] = [
    "Fields",
    "List records",
    "Create records",
    "Update records",
    "Delete records"
  ];

  public Data_Types : any[] = [
    { "text": "Text", "type": "string" },
    { "text": "Number", "type": "number" },
    { "text": "DateTime", "type": "string (ISO 8601 formatted date)" },
    { "text": "Boolean", "type": "boolean" },
    { "text": "StaticSelect", "type": "string" },
    { "text": "LinkList", "type": "array of record IDs (strings)" },
    { "text": "User", "type": "string" },
    { "text": "Website", "type": "String" },
    { "text": "Email", "type": "string" },
    { "text": "File", "type": "array of attachment objects" },
    { "text": "Rollup", "type": "number or string" },
    { "text": "PhoneNumber", "type": "string" },
    { "text": "Count", "type": "number" },
    { "text": "Currency", "type": "number" },
    { "text": "AutoNumber", "type": "number" },
    { "text": "CheckList", "type": "boolean" },
  ];

  public _authenticated: boolean;
  public x_headers: any = { "X-Api-Key" : config.apiKey };
  subscription: Subscription;

  constructor(private router: Router,private http : HttpClient)
  {
    let acc = localStorage.getItem('X-API-KEY');
    if(acc && acc.length > 0){
      this._authenticated = true;
    }else{
      this._authenticated = false;
    }

    // router.events.subscribe(event => {
    //   if (event instanceof NavigationStart) {
    //     // do something when navigation starts
    //   }
    // });
  }

  UrlMethods(operation: string, listId: string, _id?: string | number)
  {
    _id = _id ?? "6443542f45db290001c1445c";
    let $data: any = { url: String, method: String}

    if(operation == "List records"){
      $data['url']    = `Data/All`;
      $data['method'] = "POST";
    }else if (operation == "Create records"){
      $data['url']    = `Data/Create?listId=${listId}`;
      $data['method'] = "POST";
    }else if (operation == "Update records"){
      $data['url']    = `Data/Update?listId=${listId}&id=${_id}`;
      $data['method'] = "PUT";
    }else if (operation == "Delete records"){
      $data['url']    = `Data/Delete?listId=${listId}&id=${_id}`;
      $data['method'] = "DELETE";
    }
    return $data;
  }

  bodyRequest(operation: string, listId: string)
  {
    let $data: any = '';
    if(operation == "List records"){
      $data = `{"listId": "${listId}"}`;
    }else if (operation == "Create records"){
      $data  = this.FormattingFields(listId, operation);
    }else if (operation == "Update records"){
      $data  = this.FormattingFields(listId, operation);
    }else if (operation == "Delete records"){
    }
    return $data;
  }

  FormattingFields(listId: string, operation: string)
  {
    let field: any = this.get_storage(`fields_for_${listId}`);
    let data: any;
    data = '{';
    if(operation == "Create records"){data += `\n"listId": "${listId}"`;}
    JSON.parse(field).forEach((item: any) => {
      data += `\n"${item.field_id}": ${this.defaultData(item.type)}`;
    });
    data += '\n}';
    return data;
  }

  defaultData(type: number)
  {
    let data: any;
    if(type == 0){
      data = `"Ahmad Lam"`
    }else if(type == 1){
      data = `"20999"`;
    }else if(type == 2){
      data = `"2018-11-13T00:00:00.000+00:00"`;
    }else if(type == 3){
      data = `true`;
    }else if(type == 4){
      data = `"{
         "id": "14372839",
         "label": "static list item"
       }"`;
    }else if(type == 5){
      data = `"["r29jrg8hgg48g33nig", "1354535tregrfrwni2"]"`;
    }else if(type == 6){
      data = `"Rose Fowler, Bear Paw Solutions"`;
    }else if(type == 7){
      data =  `"1354535tregrfrwni2"`;
    }else if(type == 8){
      data = `"[email protected]"`;
    }else if(type == 9){
      data = `"[
        {
            "id": "r29jrg8hgg48g33nig",
            "size": 26217,
            "url": "https://www.filepicker.io/api/file/1354535tregrfrwni2",
            "type": "image/jpeg",
            "filename": "33823_3_xl.jpg",
            "thumbnails": {
                "small": {
                     "url": "https://www.filepicker.io/api/file/1354535tregrfrwni2",
                     "width": 54,
                     "height": 36
                 },
                "large": {
                     "url": "https://www.filepicker.io/api/file/1354535tregrfrwni2",
                     "width": 197,
                     "height": 131
                 }
             }
        }
    ]"`;
    }else if(type == 10){
      data = `"2018-11-13"`;
    }else if(type == 11){
      data = `"(123) 456-7890"`;
    }else if(type == 12){
      data = `1`;
    }else if(type == 13){
      data = 24791;
    }else if(type == 14){
      data = 24791;
    }else if(type == 15){
      data = `"{
        "id": "14372839",
        "label": "static list item"
      }"`;
    }else if(type == 16){
      data = `"["workiom"]"`;
    }
    return data;
  }

  setSection(section: Lists) {
    this.secton$.next(section);
  }

  setprojec(projec: Projects) {
    if(this._authenticated){
      this.projec$.next(projec);
      this.ProjectSelected = projec;
    }
  }

  public set_storage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public get_storage(key: string) {
    return localStorage.getItem(key)
  }

  public remove_storage(key: string) {
    localStorage.removeItem(key);
  }

  public clear_storage() {
    localStorage.clear();
  }

  async GetAll(){
    return this.http.get(config.apiBaseUrl+'Apps/GetAll', { headers: this.x_headers });
  }

  async Get(app_id: string){
    return this.http.get(config.apiBaseUrl+`Apps/Get?id=${app_id}&withListsAndMainFields=true`, { headers: this.x_headers });
  }

  async FieldsGetAll(listId: string){
    return this.http.get(config.apiBaseUrl+`Fields/GetAll?listId=${listId}`, { headers: this.x_headers });
  }

  async FieldsGet(listId: string | number, field_id: string | number){
    return this.http.get(config.apiBaseUrl+`Fields/Get?listId=${listId}&id=${field_id}`, { headers: this.x_headers });
  }

  // translation..
  async TranslationsFieldsName(data: any){
    return this.http.post(`https://translation.googleapis.com/language/translate/v2?key=${config.googleApiKey}`, data, {
      headers: {'Content-Type': "application/json"}
    });
  }

  // .....
  async GetAllRecordIdAndTitle(listId: string, primerFieldId: number){
    return this.http.post(config.apiBaseUrl+`Data/All`,
    {
      "listId": listId,
      "projectedFields": [primerFieldId],
      // "quickSearch": $search
    }, {
      headers: this.x_headers
    });
  }

  //TryCode
  async TryRequest(
          url: string,
          method: string,
          body?: any,
          headers?: HttpHeaders
        )
  {
    const options = { headers, body };
    switch (method) {
      case 'GET':
        return this.http.get(url, options);
      case 'POST':
        return this.http.post(url, body, options);
      case 'PUT':
        return this.http.put(url, body, options);
      case 'DELETE':
        return this.http.delete(url, options);
      case 'PATCH':
        return this.http.patch(url, body, options);
      default:
        throw new Error('Invalid HTTP method provided');
    }
  }
}

