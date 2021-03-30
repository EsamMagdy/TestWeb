import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { StepperService } from '../shared/service/stepper.service';
import { StepsModule } from 'primeng/steps';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit, OnDestroy {
  items: MenuItem[];
  subscription: Subscription;

  isLinear = true;
  isLinearSub: Subscription;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;
  sevenFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder,
    private stepperService: StepperService) { }

  ngOnInit() {
    this.items = [{
      label: 'Location',
      routerLink: 'location'
    },
    {
      label: 'Packages',
      routerLink: 'packages'
    },
    {
      label: 'Worker',
      routerLink: 'worker'
    },
    {
      label: 'Request Details',
      routerLink: 'requestDetails'
    },
    {
      label: 'Contract And Signature',
      routerLink: 'contract'
    },
    {
      label: 'Upload Attachments',
      routerLink: 'attachments'
    },
    {
      label: 'Payment',
      routerLink: 'payment'
    }
    ];

    this.isLinearSub = this.stepperService.isLinear.subscribe(value => {
      this.isLinear = !value;
    });
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
  ngOnDestroy() {
    this.isLinearSub.unsubscribe();
  }

}
