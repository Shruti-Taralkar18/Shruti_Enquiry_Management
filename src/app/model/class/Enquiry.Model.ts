export class EnquiryModel {
  enquiryId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  message: string;
  categoryId: number | null;
  statusId: number | null;
  enquiryType: string;
  isConverted: boolean;
  enquiryDate: Date | null;
  followUpDate: Date | null;
  feedback: string;

  constructor() {
    this.enquiryId = 0;
    this.customerName = '';
    this.customerEmail = '';
    this.customerPhone = '';
    this.message = '';
    this.categoryId = null;
    this.statusId = null;
    this.enquiryType = 'Call';
    this.isConverted = false;
    this.enquiryDate = null;
    this.followUpDate = null;
    this.feedback = '';
  }
}
