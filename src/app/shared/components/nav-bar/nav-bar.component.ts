import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { SharedService } from '../../service/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Projects } from './nav-bar.types';
import { Lists } from './../side-bar/side-bar.types';

@Component({
  selector: 'NavBar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent {

  logo: string | undefined;
  selected: string | number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public server: SharedService
  ){}

   ngOnInit(): void {
     this.logo = this.server.logo;
     if(this.server._authenticated){
       this.getProject();
      }
  };

  async getProject(): Promise<void>
  {
    (await this.server.GetAll()).subscribe((res: any) => {
      const get = this.server.get_storage('active_project');
      if(get && get.length > 0){
        let item = JSON.parse(get);
        this.server.setprojec(item);
        this.selected = item.name;
      }else{
        this.server.setprojec(res.result.items[0]);
        this.selected = res.result.items[0].name;
      }

      res.result.items.map((item: Projects) => {
        this.server.Projects.push({
          'id'   : item.id,
          'icon' : item.icon.replace(/far/g, "fas"),
          'name' : item.name,
          'lists': item.lists,
        });
      });
    });
  }

  selectProject(item: any) {
    const keys = Object.keys(localStorage);
    const Check = "X-API-KEY";
    keys.forEach((key) => {
      if(key != Check){
        localStorage.removeItem(key);
      }
    });
    if(Object.keys(item).length > 0){
      this.server.set_storage('active_project', JSON.stringify(item))
    }
    this.server.setprojec(item);
    this.router.navigate(['introduction'], { queryParams: { appId: item.id}});
  }
}
