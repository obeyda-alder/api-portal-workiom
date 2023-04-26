import { Injectable } from '@angular/core';
import { SharedService } from 'src/app/shared/service/shared.service';

const app: any = '';

@Injectable({
  providedIn: 'root'
})
export class ErrorsPageService {

  constructor( public server: SharedService) { }

  ngOnInit(): void {
    this.server.selectProjec$.subscribe((app) => {
      app = app;
    });
  }

  public success_table = [
    {code: 200, message: 'ok', description :'Request completed successfully.'},
  ];

  public user_error_table = [
    {code: 400, message: 'Bad Request', description :'The request encoding is invalid; the request can\'t be parsed as a valid JSON.'},
    {code: 401, message: 'Unauthorized', description :'Accessing a protected resource without authorization or with invalid credentials.'},
    {code: 402, message: 'Payment Required', description :`The account associated with the API key making requests hits a quota that can be increased by upgrading the ${ app.name } account plan.`},
    {code: 403, message: 'Forbidden', description :'Accessing a protected resource with API credentials that don\'t have access to that resource.'},
    {code: 404, message: 'Not Found', description :'Route or resource is not found. This error is returned when the request hits an undefined route, or if the resource doesn\'t exist (e.g. has been deleted).'},
    {code: 413, message: 'Request Entity Too Large', description :'The request exceeded the maximum allowed payload size. You shouldn\'t encounter this under normal use.'},
    {code: 422, message: 'Invalid Request', description :'The request data is invalid. This includes most of the base-specific validations. You will receive a detailed error message and code pointing to the exact issue.'},
  ];

  public server_error_table = [
    {code: 500, message: 'Internal Server Error', description :'The server encountered an unexpected condition.'},
    {code: 502, message: 'Bad Gateway', description :`${ app.name } servers are restarting or an unexpected outage is in progress. You should generally not receive this error, and requests are safe to retry.`},
    {code: 503, message: 'ok', description :'The server could not process your request in time. The server could be temporarily unavailable, or it could have timed out processing your request. You should retry the request with backoffs.'},
  ];
}
