import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/service/shared.service';
import { AuthServerService } from '../server/-auth-server.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  section: any;

  text1: string;
  text2: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public server: AuthServerService,
    private http: HttpClient,
    public _server: SharedService,
  )
  {
    //
  }

  ngOnInit(): void {
    this.server.section_.subscribe((section) => {
      if(Object.keys(section).length > 0){
        localStorage.setItem('custom_nav', JSON.stringify(section))
      }

      const get = localStorage.getItem('custom_nav');
      if(get && get.length > 0){
        this.section = JSON.parse(get);
      }else{
        this.section = section;
      }

      this.defaultData(this.section.title);
    });
    // //for default...
    // let query: any;
    // this.activatedRoute.queryParams.subscribe((queryParams: any) => {query = queryParams['type'].replace(/ /g, "-")});
    // this.activatedRoute.params.subscribe((params: Params) => {
    //   this.router.navigate(['/api-portal/workiom', params['type'].replace(/ /g, "-")], {queryParams:{ type: query}});
    // });


    if(!this._server._authenticated && this.activatedRoute.snapshot.params['auth'] != undefined){
      this.server.setKEY(this.activatedRoute.snapshot.params['auth']);
      this.redirect();
    }
  };

  redirect() {
    window.location.href = "/"
  }

  defaultData(title: string){
   if(title == 'Authentication'){
    this.text1 = `All APIs in Workiom needs an API Key to pass it in the header. You can grab your API Key from Account Settings`;
    this.text2 = `<p>Then pass it through the header using the name <b>"X-Api-Key"</b></p>
    <p>Sample:</p>
    <p>curl -X <b>GET</b> "https://api.workiom.com/api/services/app/Apps/GetAll" -H "accept: text/plain" -H "X-Api-Key: <b>"Your API Key"</b></p>`;
   }else if(title == 'Get List Meta Data'){
    this.text1 = `Most actions you might want to take on a list will probably require getting the list’s <b>meta-data</b> first. The meta-data response will contain a lot of useful information like the list’s fields and views along with their IDs.`;
    this.text2 = `<b>GET</b> "/api/services/app/Lists/Get"Content-Type "application/json"Headers" <b>"X-Api-Key"</b> {Your API Key}
    <p class="mb-3">"Parametersid: stringexpand: array[string] (any combination of: “Fields”, “Views”, “Filters”)</p>
     <br />
     <b class="mb-3">Response</b>
     <br />
    <p class="mb-3">{ "appId": "string", "fields": [ { "id": 0 "name": "string", "description": "string", "dataType": 0, } ], "id": "string" "name": "string", "description": "string"}</p>`;
   }else{
    this.text1 = ``;
    this.text2 = ``;
   }
  }
}
