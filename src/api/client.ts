import * as SecureStore from 'expo-secure-store';
import { Application, Appointment, Complaint, Notification, User, TimelineEvent, Announcement, ServiceType } from '../types';

const API_BASE = 'http://10.0.2.2:5000/api';

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = await SecureStore.getItemAsync('misrgate_token');
  const headers: Record<string, string> = { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(options.headers as Record<string, string> || {}) };
  const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data as T;
}

export const api = {
  setToken: (token: string) => SecureStore.setItemAsync('misrgate_token', token),
  getToken: () => SecureStore.getItemAsync('misrgate_token'),
  clearToken: () => SecureStore.deleteItemAsync('misrgate_token'),

  login: (body: { email: string; password: string }) => request<{ token: string; user: User }>('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  register: (body: { email: string; password: string; name: string; nationalId: string; phone: string }) => request<{ token: string; user: User }>('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  getProfile: () => request<{ user: User }>('/auth/profile'),
  logout: () => request<{ message: string }>('/auth/logout', { method: 'POST' }),

  getMyApplications: () => request<{ applications: Application[] }>('/applications/my-applications'),
  createApplication: (body: { serviceType: string; data: Record<string, unknown> }) => request<{ message: string; trackingCode: string; application: Application }>('/applications', { method: 'POST', body: JSON.stringify(body) }),
  trackApplication: (code: string) => request<Application>(`/applications/track/${code}`),

  getMyAppointments: () => request<{ appointments: Appointment[] }>('/appointments'),
  bookAppointment: (body: { department: string; date: string; timeSlot: string }) => request<{ message: string; appointment: Appointment }>('/appointments', { method: 'POST', body: JSON.stringify(body) }),
  cancelAppointment: (id: string) => request<{ message: string }>(`/appointments/${id}/cancel`, { method: 'PUT' }),
  getAvailableSlots: (date: string, department: string) => request<{ available: string[] }>(`/appointments/slots?date=${encodeURIComponent(date)}&department=${encodeURIComponent(department)}`),

  getNotifications: () => request<{ notifications: Notification[]; unreadCount: number }>('/notifications'),
  markAsRead: (id: string) => request<{ message: string }>(`/notifications/${id}/read`, { method: 'PUT' }),
  markAllAsRead: () => request<{ message: string }>('/notifications/read-all', { method: 'PUT' }),

  createComplaint: (body: { category: string; subject: string; message: string }) => request<{ message: string; complaint: Complaint }>('/complaints', { method: 'POST', body: JSON.stringify(body) }),
  getMyComplaints: () => request<{ complaints: Complaint[] }>('/complaints'),

  submitRating: (appId: string, body: { score: number; review?: string }) => request<{ message: string; rating: { id: string; score: number } }>(`/ratings/${appId}`, { method: 'POST', body: JSON.stringify(body) }),

  getFavorites: () => request<{ favorites: string[] }>('/favorites'),
  toggleFavorite: (serviceType: string) => request<{ favorited: boolean }>('/favorites/toggle', { method: 'POST', body: JSON.stringify({ serviceType }) }),

  getTimeline: () => request<{ events: TimelineEvent[]; total: number }>('/timeline'),

  getAnnouncements: () => request<{ announcements: Announcement[] }>('/announcements'),

  adminGetApplications: () => request<{ applications: Application[] }>('/admin/applications'),
  adminUpdateStatus: (id: string, body: { status: string; notes?: string }) => request<{ message: string }>(`/admin/applications/${id}/status`, { method: 'PUT', body: JSON.stringify(body) }),
  adminGetStats: () => request<{ stats: { totalApplications: number; totalUsers: number; byStatus: Record<string, number>; byService: Record<string, number> } }>('/admin/stats'),
  adminGetAnnouncements: () => request<{ announcements: Announcement[] }>('/admin/announcements'),
  adminCreateAnnouncement: (body: { title: string; message: string }) => request<{ message: string; announcement: Announcement }>('/admin/announcements', { method: 'POST', body: JSON.stringify(body) }),
  adminDeleteAnnouncement: (id: string) => request<{ message: string }>(`/admin/announcements/${id}`, { method: 'DELETE' }),
  adminGetReport: (period?: string) => request<{ report: { period: string; totalApplications: number; totalUsers: number; byService: Record<string, number>; byStatus: Record<string, number> } }>(`/admin/report${period ? `?period=${period}` : ''}`),

  changePassword: (body: { currentPassword: string; newPassword: string }) => request<{ message: string }>('/auth/password', { method: 'PUT', body: JSON.stringify(body) }),
};
