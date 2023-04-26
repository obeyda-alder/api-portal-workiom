import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/service/shared.service';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})
export class IntroductionComponent {

  app: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public server: SharedService
  ){}


  ngOnInit(): void {
    this.server.selectProjec$.subscribe((app) => {
      this.app = app;
    });
  };
}
