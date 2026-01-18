
export const COLORS = {
  darkBlue: '#1a3762',
  orange: '#ff751f',
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  bg: '#f0f4f8'
};

export const SAMPLE_PARCELS: any[] = [
  {
    id: '1',
    refId: 'RE-101',
    imageUrl: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?w=400',
    source: 'Offline Store',
    status: 'pending',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    refId: 'RE-102',
    imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400',
    source: 'Bulk Import',
    status: 'pending',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    refId: 'RE-103',
    imageUrl: 'https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?w=400',
    source: 'Facebook Page',
    status: 'pending',
    createdAt: new Date().toISOString()
  }
];
