
export interface Parcel {
  id: string;
  refId: string;
  imageUrl: string;
  source: string;
  status: 'pending' | 'entered';
  customerName?: string;
  customerPhone?: string;
  codAmount?: number;
  address?: string;
  note?: string;
  isExchange?: boolean;
  isCloseBox?: boolean;
  createdAt: string;
}

export interface AIAnalysisResult {
  customerName: string;
  customerPhone: string;
  codAmount: number;
  address: string;
  note: string;
}
