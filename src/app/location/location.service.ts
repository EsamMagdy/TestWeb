import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { City } from '../shared/model/city.model';
import { ContactPreviousLocation } from '../shared/model/contactPreviousLocation.model';
import { KeyValuePairs } from '../shared/model/keyValuePairs.model';
import {
  ResponseDataCRM,
  ResponseDataCRMWithDeleting,
  ResponseDataCRMWithObjectData,
} from '../shared/model/responseDataCRM.model';
import { IndividualContractService } from '../shared/service/individualContractReq.service';
import { District } from './district.model';

@Injectable({ providedIn: 'root' })
export class LocationService {
  showNewAddress = new Subject<boolean>();
  constructor(
    private http: HttpClient,
    private individualContractService: IndividualContractService
  ) {}

  getCities() {
    return this.http
      .get<ResponseDataCRM<City>>(
        'http://rht.excprotection.com:8008/ar/api/city/GetIndvCities'
      )
      .pipe(
        map((resData) => {
          return resData.data;
        })
      );
  }

  getDistrict(cityId: string) {
    return this.http
      .get<ResponseDataCRM<District>>(
        'http://rht.excprotection.com:8008/ar/api/city/Districts/' + cityId
      )
      .pipe(
        map((resData) => {
          return resData.data;
        })
      );
  }
  getPolygon(districtId: string) {
    return this.http
      .get(
        'http://rht.excprotection.com:8008/ar/api/city/Get_PolygonPath?DistrictID=' +
          districtId
      )
      .pipe(
        map((resData: any) => {
          let polygon = resData.data.value;
          let shap = polygon
            .replace(', ]', '')
            .replace('[ ', '')
            .replace(/ /g, '')
            .replace(/' , '/, ',')
            .replace(/"/g, '');
          let shaplist = shap.split(',');
          let triangleCoords = [];
          let count = shaplist.length / 2;
          for (var i = 0; i < shaplist.length; i += 2) {
            triangleCoords.push({
              lat: parseFloat(shaplist[i]),
              lng: parseFloat(shaplist[i + 1]),
            });
          }
          return triangleCoords;
        })
      );
  }
  getAddressByLatAndLong(lat: number, lng: number) {
    return this.http
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDbwcRdDylRg2IoZhU9_LmWa7dD6YL85Xk&language=ar`
      )
      .pipe(
        map((resData: any) => {
          return resData.results[0];
        })
      );
  }
  getHousingTypes() {
    return this.http
      .get<ResponseDataCRM<KeyValuePairs>>(
        'http://rht.excprotection.com:8008/ar/api/IndividualContractRequest/Options/HousingTypes'
      )
      .pipe(
        map((resData) => {
          return resData.data;
        })
      );
  }
  getHousingFloors() {
    return this.http
      .get<ResponseDataCRM<KeyValuePairs>>(
        'http://rht.excprotection.com:8008/ar/api/IndividualContractRequest/Options/HousingFloors'
      )
      .pipe(
        map((resData) => {
          return resData.data;
        })
      );
  }
  getContactSavedAddressForIndiv() {
    const contactId = this.individualContractService.individualContractReq
      .contactId;
    return this.http
      .get<ResponseDataCRM<ContactPreviousLocation>>(
        `http://rht.excprotection.com:8008/ar/api/contact/GetContactSavedAddressForIndiv?ContactId=${contactId}`
      )
      .pipe(
        map((resData) => {
          return resData.data;
        })
      );
  }
  addNewLocation(location: ContactPreviousLocation) {
    return this.http
      .post<ResponseDataCRMWithObjectData<ContactPreviousLocation>>(
        `http://rht.excprotection.com:8008/ar/api/contact/AddLocation`,
        location
      )
      .pipe(
        map((resData) => {
          return resData.data;
        })
      );
  }
  deleteSavedAddress(locationId:string) {
    return this.http
      .get<ResponseDataCRMWithDeleting>(
        `http://rht.excprotection.com:8008/ar/api/Contact/DeleteSavedAddress/${locationId}`
      )
      .pipe(
        map((resData) => {
          return resData.data.value;
        })
      );
  }
}
