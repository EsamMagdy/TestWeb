import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IndividualContractService } from "../shared/service/individualContractReq.service";

@Injectable({ providedIn: 'root' })
export class ContractService {
    constructor(private http: HttpClient,
        private individualContractService: IndividualContractService) { }

    

}