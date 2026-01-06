import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgClass,CommonModule } from '@angular/common';
import { MasterService } from '../../services/master-service';
import { IEnquiry } from '../../model/interface/Master.Model';

@Component({
  selector: 'app-enquiry-list',
  standalone: true,
  imports: [FormsModule, DatePipe,NgClass,CommonModule],
  templateUrl: './enquiry-list.html',
  styleUrls: ['./enquiry-list.css'],
})
export class EnquiryList implements OnInit {

  masterSr = inject(MasterService);

  enquiryList: IEnquiry[] = [];
  filteredEnquiryList: IEnquiry[] = [];

  searchText: string = '';
  selectedStatusId: number = 0;
  selectedStatusLabel: string = 'All';

  ngOnInit(): void {
    this.loadEnquiries();
  }

  loadEnquiries() {
    this.masterSr.getAllEnquiries().subscribe({
      next: (data: IEnquiry[]) => {
        this.enquiryList = data;
        this.filteredEnquiryList = data;
      },
      error: () => alert('Failed to load enquiries'),
    });
  }

  onStatusSelect(label: string, statusId: number) {
    this.selectedStatusLabel = label;
    this.selectedStatusId = statusId;
    this.applyFilter();
  }

  onSearchChange() {
    this.applyFilter();
  }

  applyFilter() {
    this.filteredEnquiryList = this.enquiryList.filter(item => {

      const matchSearch =
        !this.searchText ||
        item.customerName?.toLowerCase().includes(this.searchText.toLowerCase()) ||
        item.customerPhone?.includes(this.searchText);

      const matchStatus =
        this.selectedStatusId === 0 ||
        item.statusId === this.selectedStatusId;

      return matchSearch && matchStatus;
    });
  }

  onDeleteEnquiry(id: number) {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;

    this.masterSr.deleteEnquiry(id).subscribe({
      next: () => {
        alert('Deleted successfully');
        this.loadEnquiries();
      },
      error: () => alert('Delete failed'),
    });
  }

  // Dropdown status change
  onStatusChange(item: IEnquiry) {
    // Status pill updates automatically via binding
  }

  getStatusLabel(id: number): string {
    if (id === 1) return 'New';
    if (id === 2) return 'In Progress';
    if (id === 3) return 'Closed';
    return '';
  }

  getStatusClass(id: number): string {
    if (id === 1) return 'status-pill status-new';
    if (id === 2) return 'status-pill status-inprogress';
    if (id === 3) return 'status-pill status-closed';
    return 'status-pill status-new';
  }
}
