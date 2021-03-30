import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeePickSourceEnum } from '../shared/model/employeePickSourceEnum.model';
import { Employee } from '../shared/model/employeFilteringData.model';
import { HowToRecieveWorker } from '../shared/model/individualContractReq.model';
import { IndividualContractService } from '../shared/service/individualContractReq.service';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css'],
})
export class RequestDetailsComponent implements OnInit {
  employee: Employee;
  EmployeePickSource = EmployeePickSourceEnum;
  HowToRecieveWorker = HowToRecieveWorker;
  constructor(
    private router: Router,
    private individualContractService: IndividualContractService
  ) {}

  ngOnInit(): void {
    this.employee = this.individualContractService.individualContractReq.employee;
  }
  workerPage() {
    if (
      this.individualContractService.individualContractReq
        .employeePickSource === EmployeePickSourceEnum.Website &&
      this.individualContractService.individualContractReq
        .howtoReceiveWorker === HowToRecieveWorker.Delivery
    )
      this.router.navigate(['/worker'], {
        queryParams: {
          stepId: this.individualContractService.individualContractReq.stepId,
        },
      });
    if (
      this.individualContractService.individualContractReq
        .employeePickSource === EmployeePickSourceEnum.Company ||
      this.individualContractService.individualContractReq
        .howtoReceiveWorker === HowToRecieveWorker.FromBranch
    )
      this.router.navigate(['/packages'], {
        queryParams: {
          stepId: this.individualContractService.individualContractReq.stepId,
        },
      });
  }
  contractPage() {
    this.router.navigate(['/contract'], {
      queryParams: {
        stepId: this.individualContractService.individualContractReq.stepId,
      },
    });
  }
}
