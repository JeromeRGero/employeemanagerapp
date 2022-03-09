import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// We add OnInit because we want to call this function/component whenever we initialize.
export class AppComponent implements OnInit {
  title = "TEST APP"
  public employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  // public getEmployees(): void {
  //   this.employeeService.getEmployees().subscribe(
  //     next?: ((value: Employee[]) => this.employees) || null || undefined,
  //     error?: ((error: HttpErrorResponse) => alert(error.message) || null || undefined)
  //   )
  // }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: ((response: Employee[]) => {
        this.employees = response;
        console.log(this.employees)
      }),
      error: ((error: HttpErrorResponse) => alert(error.message))
    });
  }
}
