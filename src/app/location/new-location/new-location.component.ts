import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from 'src/app/shared/model/city.model';
import { District } from 'src/app/shared/model/district.model';
import { KeyValuePairs } from 'src/app/shared/model/keyValuePairs.model';
import { IndividualContractService } from 'src/app/shared/service/individualContractReq.service';
import { LocationService } from '../location.service';
import { LocationFormData } from '../locationForm.model';

@Component({
  selector: 'app-new-location',
  templateUrl: './new-location.component.html',
  styleUrls: ['./new-location.component.css'],
})
export class NewLocationComponent implements OnInit {
  @ViewChild('locationForm') locationForm: NgForm;
  locationFormData: LocationFormData;
  selectedCity: City;
  selectedDistrict: District;
  selectedHousingType: KeyValuePairs;
  selectedFloorNumber: KeyValuePairs;
  selectedHouseNumber: string;
  selectedApartmentNumber: string;
  selectedAddress: string;
  showApartmentNumber = false;
  options: any;
  lat = 0;
  lng = 0;
  showMap = false;
  showLoader = true;
  location = '';
  locationSaved = this.individualContractService.individualContractReq;

  submitted: boolean = false;
  cities: City[];
  districts: District[];
  housingType: KeyValuePairs[];
  floorNumbers: KeyValuePairs[];
  constructor(
    private individualContractService: IndividualContractService,
    private router: Router,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.locationService.getCities().subscribe((cities) => {
      this.cities = cities;
      this.showLoader = false;
    });
    // if (this.locationSaved.hasOwnProperty('city')) {
    //   // this.locationFormData = this.individualContractService.individualContractReq.locationFormData;
    //   // this.selectedCity = this.locationFormData.city;
    //   // this.selectedHouseNumber = this.locationFormData.houseNumber;
    //   // this.selectedAddress = this.locationFormData.addressNotes;
    //   this.selectedCity = {...this.individualContractService.individualContractReq.city};
    //   this.selectedHouseNumber = this.individualContractService.individualContractReq.houseNo;
    //   this.selectedAddress = this.individualContractService.individualContractReq.address;
    //   this.onChangeCity(this.selectedCity);
    // }
  }

  onChangeCity(city: any) {
    this.submitted = false;
    if (!city) return;

    this.locationService.getDistrict(city.cityId).subscribe((districts) => {
      this.districts = districts;
      // if (this.locationSaved.hasOwnProperty('district')) {
      //   // this.selectedDistrict = this.locationFormData.district;
      //   // this.onChangeDistrict(this.selectedDistrict);
      //   this.selectedDistrict = this.individualContractService.individualContractReq.district;
      //   this.onChangeDistrict(this.selectedDistrict);
      // }
    });
  }
  onChangeDistrict(district: any) {
    this.submitted = false;
    this.locationService
      .getPolygon(district.districtId)
      .subscribe((triangleCoords) => {
        debugger;
        this.lat = triangleCoords[0].lat;
        this.lng = triangleCoords[triangleCoords.length - 1].lng;
        this.getAddress();
        this.getHousingTypes();
        this.getHousingFloors();
        this.showMap = true;
      });
  }
  getAddress() {
    this.locationService
      .getAddressByLatAndLong(this.lat, this.lng)
      .subscribe((data) => {
        debugger;
        this.location = data.formatted_address;
      });
  }
  getHousingTypes() {
    this.locationService.getHousingTypes().subscribe((data) => {
      this.housingType = data;
      // if (this.locationSaved.hasOwnProperty('houseNo')) {
      //   // this.selectedHousingType = this.locationFormData.houseType;
      //   // this.selectedApartmentNumber =
      //   //   this.locationFormData.houseType.key === 1
      //   //     ? this.locationFormData.apartmentNumber
      //   //     : null;
      //   // this.onChangeHouseType(this.selectedHousingType);
      //   this.selectedHouseNumber = this.individualContractService.individualContractReq.houseNo;
      //   this.selectedApartmentNumber =
      //     this.individualContractService.individualContractReq.partmentNumber ==
      //     '1'
      //       ? this.individualContractService.indContReqCreated.partmentNumber
      //       : null;
      // }
    });
  }
  getHousingFloors() {
    this.locationService.getHousingFloors().subscribe((data) => {
      this.floorNumbers = data;
      // if (this.locationSaved.hasOwnProperty('floorNo'))
      //   // this.selectedFloorNumber = this.locationFormData.floorNumber;
      //   this.selectedFloorNumber.value =
      //     '' + this.individualContractService.individualContractReq.floorNo;
    });
  }
  onChangeHouseType(housingType: KeyValuePairs) {
    if (housingType.key === 1) this.showApartmentNumber = true;
    else this.showApartmentNumber = false;
  }
  nextPage() {
    if (!this.locationForm.valid) {
      this.submitted = true;
      return;
    }

    let location = {
      ...this.locationForm.value,
      latitude: this.lat,
      longitude: this.lng,
      contactId: this.individualContractService.individualContractReq.contactId,
    };

    this.individualContractService.setLoactionData(location);

    this.locationService.addNewLocation(location).subscribe();

    this.router.navigate(['/packages'], {
      queryParams: {
        stepId: this.individualContractService.individualContractReq.stepId,
      },
    });
  }
}
