import { Component, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SharedService } from '../../service/shared.service';
import { FieldsTable, PassData } from './project-section.types';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-project-section',
  templateUrl: './project-section.component.html',
  styleUrls: ['./project-section.component.css']
})
export class ProjectSectionComponent {
  app: any;
  section: any;
  dataSource: FieldsTable[] = [];
  displayedColumns: string[] = ['field_original_name', 'field_id', 'type', 'descriotion'];
  transTo: string | "en";
  data_type : any[] = [];
  is_opration_equal: string;
  opration_type: string;
  PassData: PassData;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public server: SharedService,
    private http: HttpClient
  )
  {
    //
  }


  ngOnInit(): void {
    this.server.selectProjec$.subscribe((app) => {
      this.app = app;
    });

    this.server.selectedSecton$.subscribe((Secton) => {
      if(Object.keys(Secton).length > 0){
        this.server.set_storage('active_section', JSON.stringify(Secton))
      }

      const get = this.server.get_storage('active_section');
      if(get && get.length > 0){
        this.section = JSON.parse(get);
      }else{
        this.section = Secton;
      }

      this.GetFieldsGetAll(this.section);
    });

    if(this.server._authenticated){
      //for default...
      let query: any;
      this.activatedRoute.queryParams.subscribe((queryParams: any) => {query = queryParams['operation'].replace(/ /g, "-")});
      this.activatedRoute.params.subscribe((params: Params) => {
        this.router.navigate(['/project', params['sections'].replace(/ /g, "-")], {queryParams:{ operation: query}});
      });
    }

    this.data_type = this.server.Data_Types;
    this.transTo = this.server.transTo;
  };

  async GetFieldsGetAll(item: any) {
    if(Object.keys(item).length > 0){
      this.router.navigate([
        item.route.title,
        item.route.param.replace(/ /g, "-")
      ],{queryParams:{ operation: item.route.operation.replace(/ /g, "-") }});

    (await this.server.FieldsGetAll(item.id)).subscribe(async (fields: any) => {
      const fields_: FieldsTable[] = [];
      fields.result.items.forEach(async (field: any, index: number) => {
        fields_.push({
          field_original_name: field.name,
          field_id: field.id,
          type: field.dataType,
          listId: field.listId,
          linkedFieldId: field.linkedFieldId,
          descriotion: "this is descriotion for field",
        });
      });
      this.server.set_storage(`fields_for_${item.id}`, JSON.stringify(fields_));

      if(item.route.operation == "Fields"){
        this.is_opration_equal = "Fields";
        let get =  this.server.get_storage(`section_id_${item.id}`);
        if(get != item.id){
          // let data = {q : fields_.map(item => (item.field_original_name)), target : this.transTo};
          // (await this.server.TranslationsFieldsName(data)).subscribe((res: any) => {
          //   res.data.translations.forEach((trans_key: any, i: number) => {
          //     fields_[i].field_after_translate_name = trans_key.translatedText.replace(/\(|\)/g, "").replace(/ /g, "_").replace(/-/g, "_").toLowerCase();
          //     let str: any = fields_[i].field_after_translate_name
          //     this.server.set_storage(fields_[i].field_id.toString(), str);
          //   });
          // });
          this.server.set_storage(`section_id_${item.id}`, item.id);
          this.dataSource = fields_;
        }else{
          let fields_for_: any = this.server.get_storage(`fields_for_${item.id}`);
          this.dataSource = JSON.parse(fields_for_);
        }
      }else{
        this.is_opration_equal = item.route.operation;
      }
    });
    }
  }
  DescriptionByCoulmnType(element: FieldsTable): any
  {
    let desc;
    switch(this.data_type[element.type]['text']) {
      case "Text": {
        desc = `A single line of text.`
        break;
      }
      case "Number": {
        desc = `An integer (whole number, e.g. 1, 32, 99). This field allows negative and positive numbers.`
        break;
      }
      case "DateTime": {
        desc = `UTC date, e.g. "2023-09-05".`
        break;
      }
      case "Boolean": {
        desc = ``
        break;
      }
      case "StaticSelect": {
        desc = `Selected option`
        break;
      }
      case "LinkList": {
        if(element.linkedFieldId != null){
          let field_name: any = this.server.get_storage(element.linkedFieldId); // ?? this.getRelationCoulmn(element);
          desc = `Array of linked records IDs from the <span class="content-span">${field_name}</span> table.`
        }else{
          desc = `Array of linked records IDs from the Coulmn table.`
        }
        break;
      }
      case "User": {
        desc = ``
        break;
      }
      case "Website": {
        desc = `A valid URL (e.g. workiom.com or https://workiom.com/project)..`
        break;
      }
      case "Email": {
        desc = `A valid email address.`
        break;
      }
      case "File": {
        desc = ``
        break;
      }
      case "Rollup": {
        desc = `Computed value: MAX(values) for Date and time in Interactions.`
        break;
      }
      case "PhoneNumber": {
        desc = `A telephone number, e.g. "(415) 555-9876".`
        break;
      }
      case "Count": {
        desc = ``
        break;
      }
      case "Currency": {
        desc = `Currency value in USD. This field only allows positive numbers.`
        break;
      }
      case "AutoNumber": {
        desc = ``
        break;
      }
      case "CheckList": {
        desc = ``
        break;
      }
      default: {
        desc = ``
        break;
      }
   }
    return desc;
  }
  ReturnData(opration: string): any
  {
    if(opration == "Fields"){
      return {
        name: opration,
        title: `Each record in the <span class="content-span">${opration}</span> contains the following fields:`,
        method: null,
        text: `Most actions you might want to take on a list will probably require getting the list’s meta-data first.
               The meta-data response will contain a lot of useful information like the list’s fields and views along with their IDs.`,
      }
    }
    else if(opration == "List records"){
      return {
        name: `Get List Records of: <span class="underline">${ this.section.name }</span>`,
        title: `To list records in <span class="content-span">${ this.section.name }</span> , issue a POST request to the <span class="content-span">${ this.section.name }</span> endpoint. Note that table names and table ids can be used interchangeably. Using table ids means table name changes do not require modifications to your API request.`,
        method: "POST",
        text: `Getting records from a list is simple and flexible. You have to specify a <span class="color_gree">listId</span> to get its records,
               but you can also specify sorting options, and use maxResultCount and skipCount for pagination,
               or pass an array of filter objects to have much more granular control over what records you get.`,
      }
    }
    else if(opration == "Create records"){
      return {
        name: `Creating Records of: <span class="underline">${ this.section.name }</span>`,
        title: `To create new records, issue a <b>POST</b> request to the <span class="content-span">${ this.section.name }</span> endpoint. Note that table names and table ids can be used interchangeably.
         Using table ids means table name changes do not require modifications to your API request.`,
        method: "POST",
        text: `Records are simple JSON objects in which each key is a <span class="content-span">fieldId</span> and each value is that record’s value for the field.
               Different fields might have different data-types, you can find a field’s id and dataType from the list’s meta-data response.`,
      }
    }
    else if(opration == "Update records"){
      return {
        name: `Updating Records of: <span class="underline">${ this.section.name }</span>`,
        title: `To update <span class="content-span">${ this.section.name }</span> records, issue a request to the <span class="content-span">${ this.section.name }</span> endpoint.`,
        method: "PUT",
        text: `Record updates are almost as simple as record creation. You just have to do
               a <b>PUT</b> call instead of <b>POST</b>, and you must provide the record ID in
               addition to the list ID. This is a standard <b>PUT</b> request, so the request
               body is the whole record, with the changed fields modified.`,
      }
    }
    else if(opration == "Delete records"){
      return {
        name: `Delete Records of: <span class="underline">${ this.section.name }</span>`,
        title: `To delete <span class="content-span">${ this.section.name }</span> records, issue a <b>DELETE</b> request to the
                <span class="content-span">${ this.section.name }</span> endpoint. Note that table names and table ids can be used interchangeably.
                 Using table ids means table name changes do not require modifications to your API request.`,
        method: "DELETE",
        text: `Your request should include a URL-encoded array of up to 10 record IDs to delete.
        You can also issue a <b>DELETE</b> request to the record endpoint to delete a single record.`,
      }
    }
    else{
      return {
        name: '',
        title: ``,
        method: "",
        text: ``,
      }
    }
  }
}
