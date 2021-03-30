import { Component, OnInit } from '@angular/core';
import { Employee, EmployeFilteringData } from 'src/app/shared/model/employeFilteringData.model';
import { IndividualContractService } from 'src/app/shared/service/individualContractReq.service';
import { WorkerService } from '../../worker.service';

@Component({
  selector: 'app-employee-item',
  templateUrl: './employee-item.component.html',
  styleUrls: ['./employee-item.component.css']
})
export class EmployeeItemComponent implements OnInit {
  displayModal = false;
  employees: Employee[] = [];
  employee: Employee;
  pageSize: number;
  totalCount: number;
  showEmployeeList = true;
  constructor(private workerService: WorkerService,
    private individualContractService: IndividualContractService) { }

  ngOnInit(): void {
    document.getElementById('headerClass').scrollIntoView();
    let professionId = this.individualContractService.individualContractReq.professionId;
    let nationalityId = this.individualContractService.individualContractReq.nationalityId;

    this.workerService.showEmployeeList.subscribe(data => {
      this.showEmployeeList = true;
    });

    this.workerService.employeeList.subscribe(empList => {
      this.showEmployeeList = false;
      this.employees = empList.model;
      this.totalCount = empList.totalCount;
      this.individualContractService.individualContractReq.employeFilteringData = new EmployeFilteringData();
      this.individualContractService.individualContractReq.employeFilteringData.employees = empList.model;
    });
    this.workerService.getAvaialableEmployees(nationalityId, professionId)
      .subscribe(employees => {
        this.employees = employees.model;
        this.totalCount = employees.totalCount;
        this.showEmployeeList = false;
        this.individualContractService.individualContractReq.employeFilteringData = new EmployeFilteringData();
        this.individualContractService.individualContractReq.employeFilteringData.employees = employees.model;
      });
  }

  showModalDialog(employeeId: string) {
    this.workerService.getEmployeeById(employeeId)
      .subscribe(data => {
        this.employee = data;
        this.displayModal = true;
        // var style = document.createElement('style');
        // style.type = 'text/css';
        // style.innerHTML = '.p-scrollpanel-bar	 { overflow: hidden !important;position: relative }';
        // document.getElementsByTagName('head')[0].appendChild(style);
      });
  }
  onCloseModal() {
    this.displayModal = false;
    // var style = document.createElement('style');
    // style.type = 'text/css';
    // style.innerHTML = '.p-scrollpanel-bar	 { overflow: flex !important;position: relative }';
    // document.getElementsByTagName('head')[0].appendChild(style);
  }
  paginate(event: any) {
  }
  onChooseEmployee(choosedEmployee: Employee) {
    this.individualContractService.individualContractReq.employee = choosedEmployee;
    this.individualContractService.individualContractReq.employeeId = choosedEmployee.employeeId;
  }
}
