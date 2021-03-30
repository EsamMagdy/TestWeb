import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { IndividualContractService } from '../shared/service/individualContractReq.service';

@Component({
  selector: 'app-contract-signature',
  templateUrl: './contract-signature.component.html',
  styleUrls: ['./contract-signature.component.css']
})
export class ContractSignatureComponent implements OnInit {
  checked: boolean;
  error: Message[] = [];
  errors: Message[];
  templateBody: string=null;
  constructor(private individualContractService: IndividualContractService,
    private router: Router) { }

  async ngOnInit(): Promise<void> {
    (await this.individualContractService.getContractTemplate()).subscribe(data => {
      this.templateBody = data.value;
    });
  }
  requestDetailPage() {
    this.router.navigate(['/requestDetails'], { queryParams: { stepId: this.individualContractService.individualContractReq.stepId } });
  }
  attachmentsPage() {
    if (this.checked) {
      this.router.navigate(['/attachments'], { queryParams: { stepId: this.individualContractService.individualContractReq.stepId } });
      this.individualContractService.individualContractReq
    }
    else {
      this.error.push({ severity: 'error', summary: 'Error', detail: ' Please agree to sign the contract,Promissory Letter and Semmah Letter upon receiving the worker' });
      this.errors = this.error;
      this.error = [];
    }
  }
}
