export type PatentStatus = 'pending' | 'registered' | 'rejected' | 'expired';

export interface Patent {
  id: string;
  applicationNumber: string;
  registrationNumber?: string;
  title: string;
  inventor: string;
  applicant: string;
  applicationDate: string;
  registrationDate?: string;
  expirationDate?: string;
  status: PatentStatus;
  category: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export const STATUS_LABELS: Record<PatentStatus, string> = {
  pending: '출원중',
  registered: '등록',
  rejected: '거절',
  expired: '만료',
};

export const STATUS_COLORS: Record<PatentStatus, string> = {
  pending: 'bg-warning/10 text-warning border-warning/20',
  registered: 'bg-success/10 text-success border-success/20',
  rejected: 'bg-destructive/10 text-destructive border-destructive/20',
  expired: 'bg-muted text-muted-foreground border-muted',
};

export const CATEGORIES = [
  '전자/통신',
  '기계/금속',
  '화학/바이오',
  '소프트웨어',
  '디자인',
  '기타',
];
