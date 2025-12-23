import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { IApiResponseModel } from '../model/interface/Master.Model';
@Injectable({
  providedIn: 'root',
})
export class MasterService {
  
  constructor(private http: HttpClient) {  }

  // getAllCategories(){
  //   return this.http.get("https://api.freeprojectapi.com/api/Enquiry/get-categories")
  // }
  getAllCategories(){
    return this.http.get<IApiResponseModel>("https://api.freeprojectapi.com/api/Enquiry/get-categories").pipe(
      map((response:IApiResponseModel)=>response.data)
    )
  }
  getAllStatus(){
    return this.http.get<IApiResponseModel>("https://api.freeprojectapi.com/api/Enquiry/get-statuses").pipe(
      map((response:IApiResponseModel)=>response.data)
    )
  }
  // getAllStatus(){
  //   return this.http.get("https://api.freeprojectapi.com/api/Enquiry/get-statuses")
  // }
  saveNewQuiry(obj:any){
    return this.http.post("https://api.freeprojectapi.com/api/Enquiry/create-enquiry",obj)
  }
  getAllEnquiries(){
    return this.http.get("https://api.freeprojectapi.com/api/Enquiry/get-enquiries")
  }
}
