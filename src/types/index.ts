export type ServiceType = 'NATIONAL_ID' | 'MILITARY_EXEMPTION' | 'BIRTH_CERTIFICATE' | 'PASSPORT' | 'TAX_PAYMENT' | 'TRAFFIC_FINE' | 'HEALTH_INSURANCE' | 'SOCIAL_INSURANCE';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'CITIZEN' | 'ADMIN';
  nationalId: string;
  phone: string;
}

export interface Application {
  id: string;
  trackingCode: string;
  serviceType: ServiceType;
  status: 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'COMPLETED';
  data: Record<string, unknown>;
  attachmentUrl?: string | null;
  notes?: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
  statusHistory: { id: string; status: string; notes?: string; changedBy: string; createdAt: string }[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface Complaint {
  id: string;
  category: string;
  subject: string;
  message: string;
  status: string;
  response?: string;
  createdAt: string;
}

export interface Appointment {
  id: string;
  department: string;
  date: string;
  timeSlot: string;
  status: string;
  notes?: string;
  createdAt: string;
}

export interface TimelineEvent {
  id: string;
  type: 'application' | 'appointment' | 'complaint' | 'rating' | 'status_change';
  title: string;
  description: string;
  status: string;
  date: string;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  active: boolean;
  createdAt: string;
}

export const SERVICE_LABELS: Record<ServiceType, { en: string; ar: string }> = {
  NATIONAL_ID: { en: 'National ID Cards', ar: 'بطاقات الرقم القومي' },
  MILITARY_EXEMPTION: { en: 'Military & Recruitment', ar: 'التجنيد والتعبئة' },
  BIRTH_CERTIFICATE: { en: 'Civil Registry Records', ar: 'وثائق الأحوال المدنية' },
  PASSPORT: { en: 'Egyptian Passport', ar: 'جواز السفر المصري' },
  TAX_PAYMENT: { en: 'Tax Payment', ar: 'سداد الضرائب' },
  TRAFFIC_FINE: { en: 'Traffic Violations', ar: 'مخالفات المرور' },
  HEALTH_INSURANCE: { en: 'Health Insurance', ar: 'التأمين الصحي' },
  SOCIAL_INSURANCE: { en: 'Social Insurance', ar: 'التأمينات الاجتماعية' },
};

export const SERVICE_ICONS: Record<ServiceType, string> = {
  NATIONAL_ID: 'id-card',
  MILITARY_EXEMPTION: 'shield',
  BIRTH_CERTIFICATE: 'bookmark',
  PASSPORT: 'book',
  TAX_PAYMENT: 'receipt',
  TRAFFIC_FINE: 'car',
  HEALTH_INSURANCE: 'heart',
  SOCIAL_INSURANCE: 'briefcase',
};

export const DEPARTMENTS = [
  { key: 'CIVIL_REGISTRY', en: 'Civil Registry', ar: 'الأحوال المدنية' },
  { key: 'PASSPORT_OFFICE', en: 'Passport Office', ar: 'مكتب الجوازات' },
  { key: 'TRAFFIC_DEPARTMENT', en: 'Traffic Department', ar: 'إدارة المرور' },
  { key: 'SOCIAL_INSURANCE', en: 'Social Insurance', ar: 'التأمينات الاجتماعية' },
  { key: 'HEALTH_INSURANCE', en: 'Health Insurance', ar: 'التأمين الصحي' },
  { key: 'TAX_AUTHORITY', en: 'Tax Authority', ar: 'مصلحة الضرائب' },
  { key: 'MILITARY_RECRUITMENT', en: 'Military Recruitment', ar: 'التجنيد والتعبئة' },
  { key: 'GENERAL_INQUIRY', en: 'General Inquiry', ar: 'استفسار عام' },
];

export const COMPLAINT_CATEGORIES = [
  { key: 'SERVICE_QUALITY', en: 'Service Quality', ar: 'جودة الخدمة' },
  { key: 'TECHNICAL_ISSUE', en: 'Technical Issue', ar: 'مشكلة تقنية' },
  { key: 'SUGGESTION', en: 'Suggestion', ar: 'اقتراح' },
  { key: 'STAFF_CONDUCT', en: 'Staff Conduct', ar: 'سلوك الموظفين' },
  { key: 'DELAY_COMPLAINT', en: 'Delay Complaint', ar: 'شكوى تأخير' },
  { key: 'OTHER', en: 'Other', ar: 'أخرى' },
];
