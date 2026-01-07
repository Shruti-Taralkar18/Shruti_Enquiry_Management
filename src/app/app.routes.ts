import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { SubmitEnquiry } from './pages/submit-enquiry/submit-enquiry';
import { EnquiryList } from './pages/enquiry-list/enquiry-list';
import { TrackEnquiry } from './pages/track-enquiry/track-enquiry';
import { Signup } from './pages/signup/signup';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: Home 
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'submit-enquiry',
    component: SubmitEnquiry
  },
  {
    path: 'enquiry-list',
    component: EnquiryList
  },
  {
    path:'track-enquiry',
    component: TrackEnquiry
  },
  {
    path:'signup',
    component: Signup
  }
];
