// import { Component, inject, OnInit } from '@angular/core';
// import { MasterService } from '../../services/master-service';
// import { FormsModule } from '@angular/forms';
// import { NgFor } from '@angular/common';

// @Component({
//   selector: 'app-submit-enquiry',
//   imports: [FormsModule,NgFor],
//   templateUrl: './submit-enquiry.html',
//   styleUrl: './submit-enquiry.css',
// })
// export class SubmitEnquiry implements OnInit {
//    masterService=inject(MasterService);
//    categoryList:any[]=[];
//    statusList:any[]=[];
//    newEnquiryObj: any = {
//   enquiryId: 0,
//   customerName: '',
//   customerEmail: '',
//   customerPhone: '',
//   message: '',
//   categoryId: null,
//   statusId: null,
//   enquiryType: '',
//   isConverted: false,
//   enquiryDate: null,
//   followUpDate: null,
//   feedback: ''
// };


//    ngOnInit(): void {
//        this.getCategory();
//        this.getStatus();
//    }
//    getCategory(){
//     this.masterService.getAllCategories().subscribe({
//       next:(result:any)=>{
//         this.categoryList=result.data;
//       }
//     })
//    }
//    getStatus(){
//     this.masterService.getAllStatus().subscribe({
//       next:(result:any)=>{
//         this.statusList=result.data;
//       }
//     })
//    }
//   //  onSaveEnquiry(){
//   //   this.masterService.saveNewQuiry(this.newEnquiryObj).subscribe({
//   //     next:(result:any)=>{
//   //       alert("Enquiry Saved Successfully");
//   //     },
//   //     error:(error:any)=>{
//   //       alert("Error while saving enquiry");
//   //     }
//   //   })
//   //  }
//   onSaveEnquiry() {

//   const payload = {
//     enquiryId: 0,
//     name: this.newEnquiryObj.customerName,       
//     email: this.newEnquiryObj.customerEmail,     
//     phone: this.newEnquiryObj.customerPhone,     
//     message: this.newEnquiryObj.message,
//     categoryId: Number(this.newEnquiryObj.categoryId),
//     statusId: Number(this.newEnquiryObj.statusId),
//     enquiryType: this.newEnquiryObj.enquiryType || "Call",
//     isConverted: this.newEnquiryObj.isConverted,
//     enquiryDate: new Date().toISOString(),       
//     followUpDate: new Date().toISOString(),      
//     feedback: this.newEnquiryObj.feedback || ""
//   };

//   console.log("Payload Sent:", payload); // 🔍 IMPORTANT

//   this.masterService.saveNewQuiry(payload).subscribe({
//     next: () => {
//       alert("Enquiry Saved Successfully");
//     },
//     error: (err) => {
//       console.error("API Error:", err.error);
//       alert("Validation failed – check payload");
//     }
//   });
// }


// }




import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgFor } from '@angular/common';
import { MasterService } from '../../services/master-service';
import { EnquiryModel } from '../../model/class/Enquiry.Model';
import { ICategory, IStatus } from '../../model/interface/Master.Model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-submit-enquiry',
  standalone: true,
  imports: [FormsModule, NgFor,AsyncPipe],
  templateUrl: './submit-enquiry.html',
  styleUrls: ['./submit-enquiry.css'],
})
export class SubmitEnquiry implements OnInit, OnDestroy {

  masterService = inject(MasterService);
  // categoryList: ICategory[] = [];
  // statusList: IStatus[] = [];
  
  $statusList:Observable<IStatus[]>=new Observable<IStatus[]>;
  $categoryList:Observable<ICategory[]>=new Observable<ICategory[]>;
  subscription!:Subscription;
  newEnquiryObj: EnquiryModel = new EnquiryModel();

  ngOnInit(): void {
    // this.getCategory();
    // this.getStatus();
  }
  
  constructor(){
   this.$categoryList=this.masterService.getAllCategories();
   this.$statusList=this.masterService.getAllStatus(); 
  }
 
  // getCategory() {
  //   this.masterService.getAllCategories().subscribe({
  //     next: (result: any) => {
  //       this.categoryList = result.data;
  //     }
  //   });
  // }

 
  // getStatus() {
  //   this.masterService.getAllStatus().subscribe({
  //     next: (result: any) => {
  //       this.statusList = result.data;
  //     }
  //   });
  // }

  onSaveEnquiry(): void {
    if (!this.newEnquiryObj.categoryId || !this.newEnquiryObj.statusId) {
      alert('Please select Category and Status');
      return;
    }

    if (
      !this.newEnquiryObj.customerName ||
      !this.newEnquiryObj.customerEmail ||
      !this.newEnquiryObj.customerPhone
    ) {
      alert('Please fill all required customer details');
      return;
    }

    // 🔹 API payload
    const payload = {
      enquiryId: 0,
      customerName: this.newEnquiryObj.customerName.trim(),
      customerEmail: this.newEnquiryObj.customerEmail.trim(),
      customerPhone: this.newEnquiryObj.customerPhone.trim(),
      message: this.newEnquiryObj.message?.trim() || '',
      categoryId: Number(this.newEnquiryObj.categoryId),
      statusId: Number(this.newEnquiryObj.statusId),
      enquiryType: this.newEnquiryObj.enquiryType || 'Call',
      isConverted: this.newEnquiryObj.isConverted || false,
      enquiryDate: this.newEnquiryObj.enquiryDate
        ? new Date(this.newEnquiryObj.enquiryDate).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
      followUpDate: this.newEnquiryObj.followUpDate
        ? new Date(this.newEnquiryObj.followUpDate).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
      feedback: this.newEnquiryObj.feedback || ''
    };

    console.log('FINAL PAYLOAD:', payload);

    this.subscription=this.masterService.saveNewQuiry(payload).subscribe({
      next: () => {
        alert('Enquiry Saved Successfully');
        this.resetForm();
      },
      error: (err) => {
        console.error('API Error:', err);
        alert('Backend validation failed');
      }
    });
  }
 ngOnDestroy(): void {
     this.subscription.unsubscribe();
 }
 
  resetForm(): void {
    this.newEnquiryObj = new EnquiryModel();
  }
}
