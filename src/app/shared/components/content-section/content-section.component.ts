import { Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import Prism from 'prismjs';
import { SharedService } from '../../service/shared.service';
import { take, Subscription } from 'rxjs';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-java';
import { FieldsTable } from '../project-section/project-section.types';


@Component({
  selector: 'content-section',
  templateUrl: './content-section.component.html',
  styleUrls: ['./content-section.component.css']
})
export class ContentSectionComponent {

  FormRequest: FormGroup;

  app: any;
  section: any;
  @Input() content: any;
  to_try: boolean = false;
  res_data: any[] = [];
  search: any;
  @ViewChild('codeEle') codeEle!: ElementRef;
  highlighted: boolean = false;
  code : string;
  language: string = "java";
  fields: any;
  hasForm: boolean = false;
  hasSelect: boolean = false;
  _ids: any[] = [];
  id_selected: string | number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public server: SharedService,
    private http: HttpClient,
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

  ngOnInit() {
    this.server.selectProjec$.subscribe((app) => {
      this.app = app;
    });

    this.server.selectedSecton$.subscribe(async (Secton) => {
      const get = this.server.get_storage('active_section');
      if(get && get.length > 0){
        this.section = JSON.parse(get);
      }else{
        this.section = Secton;
      }

      let stroage: any = this.server.get_storage(`fields_for_${this.section.id}`);
      if(stroage && Object.keys(stroage).length > 0){
        this.fields = JSON.parse(stroage);
      }else{
        this.GetFields(this.section.id);
      }

      this.FormRequest = new FormGroup({
        name: new FormControl(),
      });

      this.fields.forEach((field: any) => {
        this.FormRequest.addControl(field.field_id, new FormControl());
      });

      let operation: string = this.section.route.operation;
      this.chackOperation(operation);

      this.code = '';
      this.to_try = false;
      this.get_ids_();
    });
  }

  chackOperation(operation: string)
  {
    if(operation ==  "Create records"){
      this.hasForm = true;
      this.hasSelect = false;
    }else if(operation ==  "Update records"){
      this.hasForm = true;
      this.hasSelect = true;
    }else if(operation ==  "Delete records"){
      this.hasSelect = true;
    }else{
      this.hasSelect = false;
      this.hasForm = false;
    }
  }
  async GetFields(id: string)
  {
    const fields_: any[] = [];
    (await this.server.FieldsGetAll(id)).subscribe(async (fields: any) => {
      fields.result.items.forEach((field: any) => {
        fields_.push({
          field_original_name: field.name,
          field_id: field.id,
          type: field.dataType,
          listId: field.listId,
          linkedFieldId: field.linkedFieldId,
          descriotion: "this is descriotion for field",
        });
      });
    });
    this.fields = fields_;
  }
  async get_ids_(){
    let ids: any[] = [];
    let primerFieldId: number = this.fields[0].field_id;
    (await this.server.GetAllRecordIdAndTitle(this.section.id, primerFieldId)).subscribe(
      success => {
        let res: any = success;
      res.result.items.forEach((item: any, index: number) => {
        ids.push({
          'name' : item[primerFieldId],
          'id'   : item._id
        });
      });
      this._ids = ids;
    },
    error => {
      console.log(error);
    }
    );
  }
  IdSelected(id: string | number | any )
  {
    this.id_selected = id['id'];
  }
  async toTry(){
    this.to_try = true;
    let oper = this.section.route.operation;
    let header: any = this.server.x_headers;
    let um = this.server.UrlMethods(oper, this.section.id, this.id_selected);
    let url = `${this.server.baseUrl}${um['url']}`;
    let body: any;

    switch (oper) {
      case 'List records':
        body = {"listId": this.section.id};
        break;
      case 'Create records':
        body = this.FormRequest.value;
        break;
      case 'Update records':
        body = this.FormRequest.value;
        break;
      case 'Delete records':
        body = '';
        break;
      default:
        body = '';
        break;
    }

    (await this.server.TryRequest(url, um['method'], body, header)).pipe(take(1)).subscribe(
      success => {
          this.code = JSON.stringify(success);
          this.to_try = false;
      },
      error => {
        this.code = JSON.stringify(error);
        this.to_try = false;
      }
    );
  }
}
