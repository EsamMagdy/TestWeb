import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { EmployeePickSourceEnum } from '../shared/model/employeePickSourceEnum.model';
import { HowToRecieveWorker } from '../shared/model/individualContractReq.model';
import { IndividualContractService } from '../shared/service/individualContractReq.service';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent implements OnInit {
  error: Message[] = [];
  errors: Message[];
  EmployeePickSource = EmployeePickSourceEnum;
  HowToRecieveWorker = HowToRecieveWorker;
  constructor(private individualContractService: IndividualContractService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.individualContractService.individualContractReq.employeePickSource === this.EmployeePickSource.Company ||
      this.individualContractService.individualContractReq.howtoReceiveWorker === HowToRecieveWorker.FromBranch)
      this.router.navigate(['requestDetails']);
  }
  requestDetailPage() {
    let employeeId = this.individualContractService.individualContractReq.employeeId;
    if (!employeeId) {
      this.error.push({ severity: 'error', summary: 'Error', detail: 'Please Choose Employee' });
      this.errors = this.error;
      this.error = [];
    }
    else
      this.router.navigate(['/requestDetails'], { queryParams: { stepId: this.individualContractService.individualContractReq.stepId } });
  }
  locationPage() {
    this.router.navigate(['/location'], { queryParams: { stepId: this.individualContractService.individualContractReq.stepId } });
  }

}
