import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmployeePickSource } from '../shared/model/application/employeePickSource.model';
import { FilterPackageData } from '../shared/model/application/filterPackageData.model';
import { City, RecieveWorkerType } from '../shared/model/city.model';
import { HousingBuilding } from '../shared/model/individualContractReq.model';
import { IndividualPricing } from '../shared/model/individualPricing.model';
import { KeyValuePairs } from '../shared/model/keyValuePairs.model';
import { NationalityWithEmpAvailableNumber } from '../shared/model/nationalityWithEmpAvailableNumber.model';
import {
  ResponseDataCRM,
  ResponseDataCRMWithObjectData,
} from '../shared/model/responseDataCRM.model';
import { IndividualContractService } from '../shared/service/individualContractReq.service';
import { Pricing } from './package.model';

@Injectable({ providedIn: 'root' })
export class PackageService {
  filteringData = new Subject<FilterPackageData>();
  packages = new Subject<IndividualPricing[]>();
  packageChoosed = new Subject<IndividualPricing>();
  employeePickSource = new Subject<EmployeePickSource>();

  constructor(
    private http: HttpClient,
    private individualContractService: IndividualContractService
  ) {}

  getProfessions() {
    return this.http
      .get<ResponseDataCRM<KeyValuePairs>>(
        'http://rht.excprotection.com:8008/ar/api/IndividualContractRequest/AvailableProfession'
      )
      .pipe(
        map((resData) => {
          return resData.data;
        })
      );
  }
  getNationalitiesByProfession(professionId: string) {
    return this.http
      .get<ResponseDataCRM<NationalityWithEmpAvailableNumber>>(
        `http://rht.excprotection.com:8008/ar/api/IndividualContractRequest/GetNationalityByProfession?ProfessionId=${professionId}`
      )
      .pipe(
        map((resData) => {
          return resData.data;
        })
      );
  }
  loadPackages(professionId: string, nationalityId: string) {
    return this.http
      .post<ResponseDataCRM<IndividualPricing>>(
        'http://rht.excprotection.com:8008/ar/api/IndividualPricing/GetPricingByProfessionAndNationality',
        {
          professionId: professionId,
          nationalityId: nationalityId,
        }
      )
      .pipe(
        map((resData) => {
          this.packages.next(resData.data);
          return resData.data;
        })
      );
  }
  getCity() {
    // let cityId = this.individualContractService.individualContractReq.locationFormData.city.cityId;
    let cityId = this.individualContractService.individualContractReq.cityId;

    return this.http
      .get<ResponseDataCRMWithObjectData<City>>(
        `http://rht.excprotection.com:8008/ar/api/city?Id=${cityId}`
      )
      .pipe(
        map((resData) => {
          let city = resData.data;
          city.individualContractDeliveryCost = Math.round(
            city.individualContractDeliveryCost ?? 0.2
          );
          city.recieveWorkerType = <RecieveWorkerType>city.recieveWorkerType;
          this.individualContractService.individualContractReq.deliveryCost =
            city.individualContractDeliveryCost;
          this.individualContractService.individualContractReq.recieveWorkerType =
            city.recieveWorkerType;
          return city;
        })
      );
  }
  getHousingBuildingForIndividualContract() {
    // let cityId = this.individualContractService.individualContractReq.locationFormData.city.cityId;
    let cityId = this.individualContractService.individualContractReq.cityId;
    return this.http
      .get<ResponseDataCRM<HousingBuilding>>(
        `http://rht.excprotection.com:8008/ar/api/IndividualContractRequest/GetRecieveEmployeeHousing?CityId=${cityId}`
      )
      .pipe(
        map((resData) => {
          this.individualContractService.individualContractReq.housingBuildings =
            resData.data;
          return resData.data;
        })
      );
  }
}
