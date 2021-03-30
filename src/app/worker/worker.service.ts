import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Employee, EmployeFilteringData } from "../shared/model/employeFilteringData.model";
import { ObjectWithPaging, ResponseDataCRM, ResponseDataCRMWithObjectData, ResponseDataCRMWithPaging } from "../shared/model/responseDataCRM.model";

@Injectable({ providedIn: 'root' })
export class WorkerService {
    employeeList = new Subject<ObjectWithPaging<Employee>>();
    showEmployeeList=new Subject<boolean>();
    constructor(private http: HttpClient) { }

    getAvaialableEmployees(nationalityId: string, professionId: string) {
        return this.http.get<ResponseDataCRMWithPaging<Employee>>(`http://rht.excprotection.com:8008/ar/api/IndividualContractRequest/AvailableEmployee?nationalityId=${nationalityId}&professionId=${professionId}`)
            .pipe(map(resData => {
                return resData.data
            }));
    }
    getEmployeeById(employeeId: string) {
        return this.http.get<ResponseDataCRMWithObjectData<Employee>>(`http://rht.excprotection.com:8008/Ar/api/Employee/Get/${employeeId}`)
            .pipe(map(resData => {
                return resData.data
            }));
    }
    getemplyeeFilter(employeeFilteringdata: EmployeFilteringData) {
        return this.http.post<ResponseDataCRMWithPaging<Employee>>(`http://rht.excprotection.com:8008/ar/api/IndividualContractRequest/FilterEmployee`,
            employeeFilteringdata)
            .pipe(map(resData => {
                this.employeeList.next(resData.data);
                return resData.data;
            }));
    }
}