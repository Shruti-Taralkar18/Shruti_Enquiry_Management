import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class MasterService {
  
  constructor(private http: HttpClient) {  }

  getAllCategories(){
    return this.http.get("https://api.freeprojectapi.com/api/Enquiry/get-categories")
  }
  getAllStatus(){
    return this.http.get("https://api.freeprojectapi.com/api/Enquiry/get-statuses")
  }
  saveNewQuiry(obj:any){
    return this.http.post("https://api.freeprojectapi.com/api/Enquiry/create-enquiry",obj)
  }
}
