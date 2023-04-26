import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/service/shared.service';
import { ErrorTable } from './errors-page.types';
import { ErrorsPageService } from '../../service/errors-page.service';

@Component({
  selector: 'app-errors-page',
  templateUrl: './errors-page.component.html',
  styleUrls: ['./errors-page.component.css']
})
export class ErrorsPageComponent {

  app: any;
  displayedColumns: string[] = ['code', 'message', 'description'];
  success_table: ErrorTable[] = [];
  user_error_table: ErrorTable[] = [];
  server_error_table: ErrorTable[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public server: SharedService,
    public error_server: ErrorsPageService
  )
  {
    //
  }

  ngOnInit(): void {
    this.server.selectProjec$.subscribe((app) => {
      this.app = app;
    });

    this.success_table      = this.error_server.success_table;
    this.user_error_table   = this.error_server.user_error_table;
    this.server_error_table = this.error_server.server_error_table;
  }
}
