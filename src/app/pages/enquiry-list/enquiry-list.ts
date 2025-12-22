import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master-service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-enquiry-list',
  imports: [DatePipe],
  templateUrl: './enquiry-list.html',
  styleUrl: './enquiry-list.css',
})
export class EnquiryList implements OnInit {
masterSr=inject(MasterService);
enquiryList:any[]=[];
  ngOnInit(): void {
      this.getEnquiry();
  }
  getEnquiry(){
    this.masterSr.getAllEnquiries().subscribe({
     next:(result:any)=>{
      this.enquiryList=result.data;
     }
    })
  }
}
