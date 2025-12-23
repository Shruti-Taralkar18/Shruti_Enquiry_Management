import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MasterService } from '../../services/master-service';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { IEnquiry } from '../../model/interface/Master.Model';

@Component({
  selector: 'app-enquiry-list',
  imports: [DatePipe],
  templateUrl: './enquiry-list.html',
  styleUrl: './enquiry-list.css',
})
export class EnquiryList implements OnInit,OnDestroy {
masterSr=inject(MasterService);
enquiryList:IEnquiry[]=[];
subscription!:Subscription;
  ngOnInit(): void {
      this.getEnquiry();
  }
  getEnquiry(){
    this.subscription=this.masterSr.getAllEnquiries().subscribe({
     next:(result:any)=>{
      this.enquiryList=result.data;
     }
    })
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
