import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocationFormData } from 'src/app/location/locationForm.model';
import { Guid } from '../guid.model';
import { ContactPreviousLocation } from '../model/contactPreviousLocation.model';
import { IndividualContractReq } from '../model/individualContractReq.model';
import { IndvReqContact } from '../model/individualContractReqContact.model';
import { KeyValuePairs } from '../model/keyValuePairs.model';
import { NationalityWithEmpAvailableNumber } from '../model/nationalityWithEmpAvailableNumber.model';
import { MapperFactory } from '@dboneslabs/mpr/mapper-factory';
import { MapSetup } from 'src/app/shared/model/mapSetup.model';
import { Mapper } from '@dboneslabs/mpr/mapper';

import {
  ResponseDataCRM,
  ResponseDataCRMForContractTemplate,
  ResponseDataCRMWithObjectData,
} from '../model/responseDataCRM.model';

@Injectable({ providedIn: 'root' })
export class IndividualContractService {
  individualContractReq = new IndividualContractReq();
  indContReqCreated: IndividualContractReq;
  professionName = new Subject<string[]>();

  constructor(private http: HttpClient) {
    this.individualContractReq.stepId = Guid.newGuid();
    this.individualContractReq.contactId =
      'E0076C58-816F-EB11-A81E-000D3A47A306';
  }
  setLoactionData(location: ContactPreviousLocation) {
    let mapperFactory = new MapperFactory();
    mapperFactory.addSetup(new MapSetup());
    let mapper = mapperFactory.createMapper();

    location.$type = 'models.contactPreviousLocation';
    Object.assign(
      this.individualContractReq,
      mapper.map(location, IndividualContractReq)
    );
  }
  getContactWithPreviousLocation(userId: string) {
    return this.http
      .get(
        `http://rht.excprotection.com:8008/ar/api/IndividualContractRequest/GetWithPreviousLocation?userId=${userId}`
      )
      .pipe(
        map((resData: any) => {
          return resData.data;
        })
      )
      .subscribe((data: IndvReqContact) => {
        return data;
      });
  }
  setProfessionAndNationality(
    profession: KeyValuePairs,
    nationality: NationalityWithEmpAvailableNumber
  ) {
    this.individualContractReq.professionId = '' + profession.key;
    this.individualContractReq.professionName = profession.value;
    this.individualContractReq.nationalityId = nationality.nationalityId;
    this.individualContractReq.nationalityName = nationality.nationalityName;
    this.professionName.next([profession.value, nationality.nationalityId]);
  }
  createNewContractRequest() {
    let indConReq = { ...this.individualContractReq };
    delete indConReq.employee;
    delete indConReq.employeFilteringData;
    delete indConReq.pricing;
    delete indConReq.locationFormData;
    delete indConReq.stepId;
    delete indConReq.recieveEmployeeFromHousing;

    indConReq.pricingId = this.individualContractReq.pricing.id;
    return this.http
      .post<ResponseDataCRMWithObjectData<IndividualContractReq>>(
        'http://rht.excprotection.com:8008/ar/api/IndividualContractRequest/Create',
        indConReq,
        {
          headers: new HttpHeaders({ source: '3' }),
        }
      )
      .pipe(
        map((resData) => {
          return resData.data;
        })
      );
  }
  async getContractTemplate() {
    let indConReq = await this.createNewContractRequest().toPromise();
    this.indContReqCreated = { ...indConReq };

    return this.http
      .post<ResponseDataCRMForContractTemplate<string>>(
        'http://rht.excprotection.com:8008/ar/api/IndividualContractRequest/RequestTemplate',
        indConReq
      )
      .pipe(
        map((resData) => {
          return resData.data;
        })
      );
  }

  getContractTemplateWithIndContReq(indConReq: IndividualContractReq) {
    this.http
      .post<ResponseDataCRMForContractTemplate<string>>(
        'http://rht.excprotection.com:8008/ar/api/IndividualContractRequest/RequestTemplate',
        indConReq
      )
      .pipe(
        map((resData) => {
          return resData.data;
        })
      );
  }
}
