import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Employee } from "./employee";
import { environment } from 'src/environments/environment';

/**
 * This page was first auto generated using
 */

// This tells the entire application about this service.
// The other way would be to add the EmployeeService into the providers list
// inside of app.module.ts
@Injectable({
    providedIn: 'root'
})

export class EmployeeService {
    private apiServerUrl = environment.apiBaseUrl;

    // NOTE: Anything outside of Core must be importanted via the app.module.ts
    // in the imports list.
    constructor(private http: HttpClient) { }

    public getEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`)
    }

    // This must be post when we are sending an employee to the backend for creating/adding.
    public addEmployee(employee: Employee): Observable<Employee> {
        return this.http.post<Employee>(`${this.apiServerUrl}/employee/add`, employee)
    }

    // This must be put
    public updateEmployee(employee: Employee): Observable<Employee> {
        return this.http.put<Employee>(`${this.apiServerUrl}/employee/update`, employee)
    }

    // This must be put
    public deleteEmployee(employeeId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`)
    }
}
