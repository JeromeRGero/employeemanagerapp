import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  public editEmployee: Employee | undefined;
  public deleteEmployee: Employee | undefined;

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

  public searchEmployees(key: string): void {
    console.log(key)
    // e represents an employee.
    const results: Employee[] = [];
    for (const e of this.employees){
      if (e.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      e.email.toLowerCase().indexOf(key.toLowerCase()) !== -1  ||
      e.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1  ||
      e.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1 ) {
        results.push(e);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }

  // This is the programmatic way for a button to function and show a modal withing angular.
  public onOpenModal(mode: string, employee?: Employee): void {
    console.log("This is working!")
    const container = document.getElementById("main-container");
    console.log(container);
    const button = document.createElement("button");
    console.log(button);
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode == 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    } else if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    } else if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    console.log(button)
    console.log()
    button.click();
  }

  public onAddEmployee(addForm: NgForm): void {
    document.getElementById("add-employee-form")?.click();
    this.employeeService.addEmployee(addForm.value).subscribe({
      next: ((response: Employee) => {
        console.log(response);
        this.getEmployees();
        // The following clears the entire form for us.
        addForm.reset();
      }),
      error: ((error: HttpErrorResponse) => {
        alert(error.message);
      })
    });
  }

  public onUpdateEmployee(employee: Employee): void {
    document.getElementById("edit-employee-form")?.click();
    this.employeeService.updateEmployee(employee).subscribe({
      next: ((response: Employee) => {
        console.log(response);
        this.getEmployees();
      }),
      error: ((error: HttpErrorResponse) => {
        alert(error.message);
      })
    });
  }

  public onDeleteEmployee(id: number | undefined): void {
    document.getElementById("edit-employee-form")?.click();
    this.employeeService.deleteEmployee(id!).subscribe({
      next: ((response: void) => {
        console.log(response);
        this.getEmployees();
      }),
      error: ((error: HttpErrorResponse) => {
        alert(error.message);
      })
    });
  }

}
