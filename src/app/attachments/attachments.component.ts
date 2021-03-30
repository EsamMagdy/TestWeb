import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IndividualContractAttachment } from '../shared/model/individualContractReq.model';
import { IndividualContractService } from '../shared/service/individualContractReq.service';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.css'],
})
export class AttachmentsComponent implements OnInit {
  @ViewChild('identificationImage') identificationCardImage: ElementRef;
  @ViewChild('familyImage') familyCardImage: ElementRef;
  @ViewChild('nationalAddressImage') nationalAddressImage: ElementRef;
  @ViewChild('customerSalaryImage') customerSalaryImage: ElementRef;
  attachments: { [key: string]: any } = {};
  previewImage: any;
  images: any = [];

  displayBasic2: boolean;
  constructor(
    private router: Router,
    private individualContractService: IndividualContractService
  ) { }

  ngOnInit(): void { }

  contractlPage() {
    this.router.navigate(['/contract'], {
      queryParams: {
        stepId: this.individualContractService.individualContractReq.stepId,
      },
    });
  }
  paymentPage() {

    this.chkValidation(
      this.identificationCardImage,
      'identificationCardImage',
      'identificationCardImageName'
    );
    this.chkValidation(
      this.familyCardImage,
      'familyCardImage',
      'familyCardImageName'
    );
    this.chkValidation(
      this.nationalAddressImage,
      'nationalAddressImage',
      'nationalAddressImageName'
    );
    this.chkValidation(
      this.customerSalaryImage,
      'customerSalaryImage',
      'customerSalaryImageName'
    );

    this.individualContractService.individualContractReq.attachments = <
      IndividualContractAttachment
      >this.attachments;
    this.router.navigate(['/payment'], {
      queryParams: {
        stepId: this.individualContractService.individualContractReq.stepId,
      },
    });
  }
  onPrieviewImage(imageSelected: any) {
    if (!imageSelected.files || !imageSelected.files[0]) return;

    const file = imageSelected.files[0];
    this.priviewImage(file);
  }

  priviewImage(imageSelected: any) {
    this.images[0] = this.previewImage;
    this.displayBasic2 = true;
    const reader = new FileReader();
    reader.onload = (e) => (this.previewImage = reader.result);
    reader.readAsDataURL(imageSelected);
  }

  private chkValidation(element: ElementRef, image: any, imageName: string) {
    if (element.nativeElement.files && element.nativeElement.files[0]) {
      this.attachments[image] = element.nativeElement.files[0];
      this.attachments[imageName] = element.nativeElement.files[0].name;
    }
  }
}
