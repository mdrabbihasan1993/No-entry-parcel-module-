
import React, { useState, useEffect } from 'react';
import { X, Sparkles, Loader2, Save, Ban, Phone, User as UserIcon, MapPin, Notebook, DollarSign, ArrowRightLeft, PackageCheck } from 'lucide-react';
import { COLORS } from '../constants';
import { Parcel, AIAnalysisResult } from '../types';
import { analyzeParcelContent } from '../services/geminiService';

interface Props {
  parcel: Parcel | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Parcel>) => void;
}

const ParcelEntryModal: React.FC<Props> = ({ parcel, isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<AIAnalysisResult>({
    customerName: '',
    customerPhone: '',
    codAmount: 0,
    address: '',
    note: ''
  });
  const [isExchange, setIsExchange] = useState(false);
  const [isCloseBox, setIsCloseBox] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        customerName: '',
        customerPhone: '',
        codAmount: 0,
        address: '',
        note: ''
      });
      setIsExchange(false);
      setIsCloseBox(true);
    }
  }, [isOpen]);

  const handleMagicFill = async () => {
    if (!parcel?.imageUrl) return;
    setIsAnalyzing(true);
    try {
      // For demo, we are fetching the image and passing it as inlineData
      // In a real app, you'd fetch the proxy or use a direct URL if allowed
      const response = await fetch(parcel.imageUrl);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64Data = (reader.result as string).split(',')[1];
        const result = await analyzeParcelContent({
          mimeType: 'image/jpeg',
          data: base64Data
        });
        setFormData(result);
      };
    } catch (error) {
      console.error("AI Analysis failed", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-300">
        <div className="bg-slate-900 p-6 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500 rounded-xl">
              <PackageCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Add Parcel Details</h3>
              <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">Ref: {parcel?.refId}</p>
            </div>
          </div>
          <button onClick={onClose} className="hover:bg-white/10 p-2 rounded-full transition-colors"><X className="w-5 h-5" /></button>
        </div>

        <form className="p-6 space-y-6 max-h-[80vh] overflow-y-auto" onSubmit={(e) => {
          e.preventDefault();
          onSubmit({ ...formData, isExchange, isCloseBox });
        }}>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-full sm:w-1/3 aspect-square rounded-2xl bg-slate-100 overflow-hidden border-4 border-slate-50 shadow-inner group relative">
              <img src={parcel?.imageUrl} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-[10px] font-bold uppercase tracking-wider">Reference Image</span>
              </div>
            </div>
            
            <div className="flex-1 space-y-3">
              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4">
                <p className="text-xs text-orange-800 mb-2 font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> AI Assistant
                </p>
                <button 
                  type="button"
                  onClick={handleMagicFill}
                  disabled={isAnalyzing}
                  className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-300 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 transition-all active:scale-95"
                >
                  {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  {isAnalyzing ? "Analyzing Label..." : "Magic Auto-Fill"}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Customer Name</label>
              <div className="relative">
                <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                  type="text" 
                  required
                  value={formData.customerName}
                  onChange={e => setFormData({...formData, customerName: e.target.value})}
                  placeholder="Full name" 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-orange-500 focus:outline-none transition-all"
                />
              </div>
            </div>
            <div className="relative">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                  type="tel" 
                  required
                  value={formData.customerPhone}
                  onChange={e => setFormData({...formData, customerPhone: e.target.value})}
                  placeholder="01XXXXXXXXX" 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-orange-500 focus:outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">COD Amount</label>
              <div className="relative">
                <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                  type="number" 
                  required
                  value={formData.codAmount || ''}
                  onChange={e => setFormData({...formData, codAmount: Number(e.target.value)})}
                  placeholder="৳ 0.00" 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-orange-500 focus:outline-none transition-all font-bold text-lg text-slate-800"
                />
              </div>
            </div>
            <div className="relative">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Delivery Address</label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-4 text-slate-400 w-4 h-4" />
                <textarea 
                  required
                  rows={3}
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                  placeholder="Area, Road, House..." 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-orange-500 focus:outline-none transition-all resize-none"
                />
              </div>
            </div>
          </div>

          <div className="relative">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Delivery Note</label>
            <div className="relative">
              <Notebook className="absolute left-3.5 top-4 text-slate-400 w-4 h-4" />
              <textarea 
                rows={2}
                value={formData.note}
                onChange={e => setFormData({...formData, note: e.target.value})}
                placeholder="Optional instructions..." 
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-orange-500 focus:outline-none transition-all resize-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div 
              onClick={() => setIsExchange(!isExchange)}
              className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${isExchange ? 'bg-orange-50 border-orange-500' : 'bg-slate-50 border-transparent hover:border-slate-200'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isExchange ? 'bg-orange-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                  <ArrowRightLeft className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Exchange</p>
                  <p className="text-[10px] text-slate-500 uppercase">Swap items</p>
                </div>
              </div>
              <input type="checkbox" checked={isExchange} readOnly className="sr-only" />
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isExchange ? 'border-orange-500 bg-orange-500' : 'border-slate-300'}`}>
                {isExchange && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
              </div>
            </div>

            <div 
              onClick={() => setIsCloseBox(!isCloseBox)}
              className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${isCloseBox ? 'bg-blue-50 border-blue-500' : 'bg-slate-50 border-transparent hover:border-slate-200'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isCloseBox ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                  <PackageCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Close Box</p>
                  <p className="text-[10px] text-slate-500 uppercase">Secure seal</p>
                </div>
              </div>
              <input type="checkbox" checked={isCloseBox} readOnly className="sr-only" />
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isCloseBox ? 'border-blue-500 bg-blue-500' : 'border-slate-300'}`}>
                {isCloseBox && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
              </div>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 py-4 px-6 border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
              <Ban className="w-4 h-4" /> Cancel
            </button>
            <button 
              type="submit" 
              className="flex-[2] py-4 px-6 bg-slate-900 hover:bg-black text-white rounded-2xl font-bold transition-all shadow-xl shadow-slate-900/20 active:scale-95 flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" /> Save & Entry Parcel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ParcelEntryModal;
