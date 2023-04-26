import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { Lists } from './side-bar.types';
import { SharedService } from '../../service/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { AuthServerService } from 'src/app/auth/server/-auth-server.service';


@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class sideBarComponent implements AfterViewInit {
  @Input() routerLinkActive: string;
  step: number | string;
  navBar : Lists[] = [];
  id : string | number;
  active: boolean = false;
  operations : string[] = [];

  custom_nav: any[] = [
    {"title" :  'Authentication', "icon" : "fas fa-wrench"},
    {"title" :  'Get List Meta Data', "icon" : "fas fa-exchange"},
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public server: SharedService,
    public auth_server: AuthServerService
  )
  {
  }

  ngAfterViewInit(): void {
    //
  }

  ngOnInit(): void {
    this.operations = this.server.Operations;
    if(this.server._authenticated){
      this.server.selectProjec$.subscribe((app) => {
        if(app.id != undefined){
          this.id = app.id;
          this.getData(app.id);
        }
      });
    }
    const get = this.server.get_storage('active_section');
    if(get && get.length > 0){
      let item = JSON.parse(get);
      this.setStep(item.id);
    }
  };

  setStep(id: string |  number){
    this.step = id;
  }
  _section(section: any) {
    this.auth_server.setSection_(section);
  }
  async getData(app_id: any){
    (await this.server.Get(app_id)).subscribe((res: any) => {
      const Lists : Lists[] = [];
        res.result.lists.forEach((list: any) => {
          Lists.push({
          'id'          :  list.id,
          'appId'       :  list.appId,
          'name'        :  list.name,
          'description' :  list.description,
          'icon'        :  list.icon.replace(/far/g, "fas"),
          "fields"      : list.fields,
          'route'       :  {
              'title' : 'project',
              'param' : list.id,
          },
        });
        this.navBar = Lists;
      });
    });
  }
  public isActive(item: Lists, operation: string, exact: boolean) {
    let rout = '/project/'+item.id+'?operation='+operation.replace(/ /g, "-");
    return this.router.isActive(rout, exact);
  }
  selectSection(item: Lists, operation: string) {
    this.active = true;
    item.route.operation = operation;
    this.server.setSection(item);
  }
}
