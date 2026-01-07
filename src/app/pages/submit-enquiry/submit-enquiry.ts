import { Component, inject } from '@angular/core';
import { MasterService } from '../../services/master-service';
import { Observable } from 'rxjs';
import { ICategory, IStatus } from '../../model/interface/Master.Model';
import { EnquiryModel } from '../../model/class/Enquiry.Model';
import { CommonImports } from '../../Global.constant';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-submit-enquiry',
  standalone: true,
  imports: [CommonImports,CommonModule],
  templateUrl: './submit-enquiry.html',
  styleUrls: ['./submit-enquiry.css'],
})
export class SubmitEnquiry {

  masterService = inject(MasterService);

  $categoryList: Observable<ICategory[]> = this.masterService.getAllCategories();
  $statusList: Observable<IStatus[]> = this.masterService.getAllStatus();

  newEnquiryObj: EnquiryModel = new EnquiryModel();

  onSaveEnquiry(form: any) {
    if (form.invalid) {
      alert('Please fill all required fields');
      return;
    }

    const payload = {
      enquiryId: 0,
      customerName: this.newEnquiryObj.customerName,
      customerEmail: this.newEnquiryObj.customerEmail,
      customerPhone: this.newEnquiryObj.customerPhone,
      message: this.newEnquiryObj.message,
      categoryId: this.newEnquiryObj.categoryId,
      statusId: this.newEnquiryObj.statusId,
      enquiryType: 'Call',
      feedback: this.newEnquiryObj.feedback || ''
    };

    this.masterService.saveNewQuiry(payload).subscribe({
      next: () => {
        alert('Enquiry saved successfully');
        form.resetForm();
      },
      error: () => alert('Error saving enquiry')
    });
  }
}
