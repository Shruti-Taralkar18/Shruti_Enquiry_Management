import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { IApiResponseModel } from '../model/interface/Master.Model';

@Injectable({
  providedIn: 'root',
})
export class MasterService {

  constructor(private http: HttpClient) {}

  saveNewQuiry(obj: any) {
    return this.http.post(
      'https://api.freeprojectapi.com/api/Enquiry/create-enquiry',
      obj
    );
  }

  getAllCategories() {
    return this.http
      .get<IApiResponseModel>(
        'https://api.freeprojectapi.com/api/Enquiry/get-categories'
      )
      .pipe(map((response: IApiResponseModel) => response.data));
  }

  getAllStatus() {
    return this.http
      .get<IApiResponseModel>(
        'https://api.freeprojectapi.com/api/Enquiry/get-statuses'
      )
      .pipe(map((response: IApiResponseModel) => response.data));
  }


 getAllEnquiries() {
  return this.http
    .get<any>('https://api.freeprojectapi.com/api/Enquiry/get-enquiries')
    .pipe(map(res => res.data));   
}


  deleteEnquiry(enquiryId: number) {
    return this.http.delete(
      `https://api.freeprojectapi.com/api/Enquiry/delete-enquiry/${enquiryId}`
    );
  }
  filterEnquiries(filterObj: any) {
  return this.http.post(
    'https://api.freeprojectapi.com/api/Enquiry/filter-enquiries',
    filterObj
  );
}




}
