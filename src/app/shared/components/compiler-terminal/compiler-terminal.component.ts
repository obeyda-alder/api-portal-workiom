import { config } from './../../../configApp';
import { Inject, Injectable, PLATFORM_ID, AfterViewChecked, Component, OnInit, ViewChild, Input, ElementRef, OnChanges } from '@angular/core';
import { SharedService } from '../../service/shared.service';
import { isPlatformBrowser } from '@angular/common';
import Prism from 'prismjs';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-scss';

@Component({
  selector: 'app-compiler-terminal',
  templateUrl: './compiler-terminal.component.html',
  styleUrls: ['./compiler-terminal.component.css']
})
export class CompilerTerminalComponent implements OnInit, AfterViewChecked{

  @ViewChild('codeEle') codeEle!: ElementRef;

  app: any;
  section: any;
  highlighted: boolean = false;
  code : string;
  responseCode : string;
  language: string = "curl";
  languageStyle: string = "typescript";
  operation_url: string;
  operation_method: string;

  constructor(
    public server: SharedService,
    @Inject(PLATFORM_ID) private platformId: Object
  )
  {
    //
  }

  ngAfterViewChecked() {
    this.highlight();
    this.highlighted = true;
  }

  highlight() {
    // this.codeEle.nativeElement.textContent = this.code;
    // Prism.highlightElement(this.codeEle.nativeElement);

    if (isPlatformBrowser(this.platformId)) { // chack is browser
      Prism.highlightAll();
    }
  }

  ngOnInit(): void {
    this.server.selectProjec$.subscribe((app) => {
      this.app = app;
    });

    this.server.selectedSecton$.subscribe((Secton) => {

      const get = this.server.get_storage('active_section');
      if(get && get.length > 0){
        this.section = JSON.parse(get);
      }else{
        this.section = Secton;
      }
      if(this.section.route != undefined){
        let operation = this.section.route.operation;
        this.ReturnCodeByLang(this.language, operation);
        this.ReturnResponseCode(operation);
      }
    });
  }
  setLang($event: any)
  {
    this.language = $event.tab.textLabel;
    this.ReturnCodeByLang(this.language, this.section.route.operation);
  }
  ReturnCodeByLang(lang: string, operation: string)
  {
    if(operation != "Fields"){
      let $data = this.server.UrlMethods(operation, this.section.id);
      let body  = this.server.bodyRequest(operation, this.section.id);

      if(lang == "curl"){
        this.code =`
curl --location --request ${$data['method']} '${this.server.baseUrl}${$data['url']}'
--header 'X-Api-Key:${this.server.apiKey}'
--header 'Content-Type: application/json'
--data '${body}'`;
      }else if(lang == "PHP-cURL"){
        this.code = `
<?php
$curl = curl_init();
curl_setopt_array($curl, array(
  CURLOPT_URL => '${this.server.baseUrl}${$data['url']}',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => '${$data['method']}',
  CURLOPT_POSTFIELDS =>'
  ${body}',
  CURLOPT_HTTPHEADER => array(
    'X-Api-Key: ${this.server.apiKey}',
    'Content-Type: application/json'
  ),
));
$response = curl_exec($curl);
curl_close($curl);
echo $response;`
      }else if(lang == "NodeJs"){
        this.code = `
var request = require('request');
var options = {
  'method': '${$data['method']}',
  'url': '${this.server.baseUrl}${$data['url']}',
  'headers': {
    'X-Api-Key': '${this.server.apiKey}',
    'Content-Type': 'application/json'
  },
  body: ${body}
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});`
      }
      else{
        this.code = '';
      }
    }else{
      this.code = '';
    }
  }
  ReturnResponseCode(operation: string)
  {
    if(operation == "List records"){
      this.responseCode = `
      {
        "result": {
            "totalCount": 1,
            "items": [
              {
                  "_id": "64432f26b032d10001e89d88",
                  "2014502": "Ahmad Lam",
                  "2014513": {
                      "id": "109725",
                      "fullname": "fade Al. ",
                      "emailAddress": "fade@gmail.com",
                      "UserType": 1,
                      "isActive": true
                  },
                  "2014514": "2023-04-22T00:49:00Z"
              },
            ]
          },
        "targetUrl": null,
        "success": true,
        "error": null,
        "unAuthorizedRequest": false,
        "__abp": true
      }`
    }else if(operation == "Create records"){
      this.responseCode = `
      {
        "result": {
            "_id": "64440b685b8b7f000115f7fc",
            "2014502": "Ahmad Lam",
            "2014513": {
                "id": "109725",
                "fullname": "fade Al",
                "emailAddress": "fade@gmail.com",
                "UserType": 1,
                "isActive": true
            },
            "2014514": "2023-04-22T16:29:00Z"
        },
        "targetUrl": null,
        "success": true,
        "error": null,
        "unAuthorizedRequest": false,
        "__abp": true
      }`
    }else if(operation == "Update records"){
      this.responseCode = `
      {
        "result": {
            "_id": "5bc4883cb72f6223a4c196c5",
            "2014502": "Ahmad Lam",
            "2014513": {
                "id": "109725",
                "fullname": "fade Al",
                "emailAddress": "fade@gmail.com",
                "UserType": 1,
                "isActive": true
            },
            "2014514": "2023-04-11T02:53:00Z",
            "2014520": "2023-04-22T16:30:00Z",
            "2014515": {
                "id": "109725",
                "fullname": "fade Al",
                "emailAddress": "fade@gmail.com",
                "UserType": 1,
                "isActive": true
            },
            "2014516": "2023-04-22T16:30:00Z"
        },
        "targetUrl": null,
        "success": true,
        "error": null,
        "unAuthorizedRequest": false,
        "__abp": true
      }`
    }else if(operation == "Delete records"){
      this.responseCode = `
      {
        "result": null,
        "targetUrl": null,
        "success": true,
        "error": null,
        "unAuthorizedRequest": false,
        "__abp": true
      }`
    }else{
      this.responseCode = ``;
    }
  }
}
