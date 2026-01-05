import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MasterService } from '../../services/master-service';
import { DatePipe, NgClass } from '@angular/common';
import { Subscription } from 'rxjs';
import { IEnquiry } from '../../model/interface/Master.Model';

@Component({
  selector: 'app-enquiry-list',
  imports: [DatePipe, NgClass],
  templateUrl: './enquiry-list.html',
  styleUrl: './enquiry-list.css',
})
export class EnquiryList implements OnInit, OnDestroy {

  masterSr = inject(MasterService);
  enquiryList: IEnquiry[] = [];
  subscription!: Subscription;

  ngOnInit(): void {
    this.getEnquiry();
  }

  getEnquiry() {
    this.subscription = this.masterSr.getAllEnquiries().subscribe({
      next: (result: any) => {
        this.enquiryList = result.data;
      },
      error: () => {
        alert('Failed to load enquiries');
      },
    });
  }

  onDeleteEnquiry(enquiryId: number) {

    const isConfirm = confirm(
      'Are you sure you want to delete this enquiry?'
    );

    if (!isConfirm) {
      return;
    }

    this.masterSr.deleteEnquiry(enquiryId).subscribe({
      next: () => {
        alert('Enquiry deleted successfully');
        this.getEnquiry();
      },
      error: () => {
        alert('Failed to delete enquiry');
      },
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
