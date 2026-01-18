
import React, { useState } from 'react';
import { Parcel } from './types';
import { SAMPLE_PARCELS } from './constants';

const App: React.FC = () => {
  const [pendingParcels, setPendingParcels] = useState<Parcel[]>(SAMPLE_PARCELS);
  const [successParcels, setSuccessParcels] = useState<any[]>([]);
  const [pendingCount, setPendingCount] = useState(SAMPLE_PARCELS.length);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRef, setSelectedRef] = useState('');
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [previewSrc, setPreviewSrc] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Form states - toggles default to off (false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    amount: '',
    address: '',
    note: '',
    isExchange: false,
    isCloseBox: false
  });

  const openModal = (ref: string) => {
    setSelectedRef(ref);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: '',
      phone: '',
      amount: '',
      address: '',
      note: '',
      isExchange: false,
      isCloseBox: false
    });
  };

  const openImagePreview = (src: string) => {
    setPreviewSrc(src);
    setIsImagePreviewOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEntry = {
      ref: selectedRef,
      ...formData
    };

    setSuccessParcels([newEntry, ...successParcels]);
    setPendingParcels(pendingParcels.filter(p => p.refId !== selectedRef));
    setPendingCount(prev => prev - 1);
    
    closeModal();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Common class for inputs to ensure black text and consistent styling
  const inputClass = "w-full p-3 bg-gray-50 border rounded-xl focus:border-[#ff751f] focus:outline-none transition text-gray-900 font-medium placeholder:text-gray-400";

  return (
    <div className="min-h-screen bg-[#f0f4f8] font-['Inter']">
      {/* Top Header */}
      <header className="bg-white p-4 shadow-sm flex justify-between items-center border-b sticky top-0 z-40">
        <div className="flex items-center gap-6">
          <div className="text-2xl font-bold text-[#1a3762] border-r pr-6 hidden sm:block">
            <span className="text-[#ff751f]">Fast</span>Courier
          </div>
          <h2 className="text-xl font-bold text-[#1a3762]">Merchant Panel</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-bold">Rahat Enterprise</p>
            <p className="text-xs text-gray-500 italic">M-ID: 99281</p>
          </div>
          <div className="bg-[#ff751f] w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">RE</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <div className="p-6 max-w-6xl mx-auto w-full space-y-8">
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black text-[#1a3762] tracking-tight uppercase">NO Entry Parcel List</h1>
              <p className="text-gray-500">Ei parcel gulo ekhono system-e entry kora hoyni.</p>
            </div>
            <span className="bg-blue-100 text-[#1a3762] px-4 py-1 rounded-full text-sm font-bold">Pending: {pendingCount}</span>
          </div>

          {/* NO ENTRY PARCEL LIST */}
          <div className="grid grid-cols-1 gap-4">
            {pendingParcels.map(parcel => (
              <div key={parcel.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:border-[#ff751f] transition duration-300">
                <div className="flex items-center gap-6">
                  <div onClick={() => openImagePreview(parcel.imageUrl)} className="cursor-zoom-in hover:scale-105 transition-transform w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center border overflow-hidden">
                    <img src={parcel.imageUrl} alt="Parcel" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1a3762]">Pending Order #{parcel.refId}</h4>
                    <p className="text-sm text-gray-500">Received from: {parcel.source}</p>
                    <p className="text-xs text-[#ff751f] font-semibold">Status: Waiting for Entry</p>
                  </div>
                </div>
                <button onClick={() => openModal(parcel.refId)} className="bg-[#ff751f] hover:bg-[#e66416] text-white px-6 py-2 rounded-lg font-bold text-sm shadow-md transition-all active:scale-95">
                  <i className="fas fa-plus mr-2"></i> Add Parcel
                </button>
              </div>
            ))}
          </div>

          {/* SUCCESS LIST TABLE */}
          <div className="mt-12 space-y-4">
            <h3 className="text-lg font-bold text-[#1a3762] flex items-center">
              <i className="fas fa-check-circle text-green-500 mr-2"></i> Recently Added Parcels
            </h3>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-[#1a3762] font-bold border-b">
                  <tr>
                    <th className="p-4">Reference</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Details & Options</th>
                    <th className="p-4">COD Amount</th>
                    <th className="p-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {successParcels.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-400 italic">Ekhono kono parcel entry kora hoyni.</td>
                    </tr>
                  ) : (
                    successParcels.map((p, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition">
                        <td className="p-4 font-bold text-[#1a3762]">{p.ref}</td>
                        <td className="p-4">
                          <div className="font-bold text-gray-900">{p.name}</div>
                          <div className="text-xs text-gray-400">{p.phone}</div>
                        </td>
                        <td className="p-4">
                          <div className="text-gray-600 max-w-xs truncate" title={p.address}>{p.address}</div>
                          <div className="flex gap-2 mt-1">
                            {p.isExchange && <span className="text-[9px] bg-[#ff751f] text-white px-2 py-0.5 rounded uppercase font-bold">Exchange</span>}
                            {p.isCloseBox && <span className="text-[9px] bg-blue-500 text-white px-2 py-0.5 rounded uppercase font-bold">Close Box</span>}
                          </div>
                        </td>
                        <td className="p-4 font-black text-[#1a3762]">৳ {p.amount}</td>
                        <td className="p-4 text-center">
                          <button className="text-[#ff751f] hover:scale-125 transition"><i className="fas fa-print"></i></button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* IMAGE PREVIEW MODAL */}
      {isImagePreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[100] p-4" onClick={() => setIsImagePreviewOpen(false)}>
          <button className="absolute top-5 right-5 text-white text-3xl hover:text-[#ff751f] transition"><i className="fas fa-times"></i></button>
          <img src={previewSrc} alt="Full View" className="max-w-full max-h-[90vh] rounded-lg shadow-2xl transition-transform duration-300" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      {/* ADD PARCEL MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden transform transition-all animate-in fade-in zoom-in duration-200">
            <div className="bg-[#1a3762] p-6 flex justify-between items-center text-white">
              <h3 className="text-lg font-bold"><i className="fas fa-plus-circle text-orange-400 mr-2"></i> Add Parcel Details</h3>
              <button onClick={closeModal} className="hover:text-orange-400 transition"><i className="fas fa-times"></i></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[85vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Customer Name</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter customer name" 
                  className={inputClass} 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone Number</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    placeholder="01XXXXXXXXX" 
                    className={inputClass} 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">COD Amount</label>
                  <input 
                    type="number" 
                    required 
                    value={formData.amount}
                    onChange={e => setFormData({...formData, amount: e.target.value})}
                    placeholder="৳ 0.00" 
                    className={inputClass} 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Address</label>
                <textarea 
                  required 
                  rows={2} 
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                  placeholder="House/Road, Area, District..." 
                  className={inputClass + " resize-none"}
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Note (Optional)</label>
                <textarea 
                  rows={2} 
                  value={formData.note}
                  onChange={e => setFormData({...formData, note: e.target.value})}
                  placeholder="Any instruction for rider..." 
                  className={inputClass + " resize-none"}
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-[#1a3762]">Exchange</p>
                    <p className="text-[10px] text-gray-500 uppercase">Enable exchange</p>
                  </div>
                  <label className="relative inline-block w-11 h-6 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={formData.isExchange} 
                      onChange={e => setFormData({...formData, isExchange: e.target.checked})} 
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff751f]"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-[#1a3762]">Close Box</p>
                    <p className="text-[10px] text-gray-500 uppercase">Check before pay</p>
                  </div>
                  <label className="relative inline-block w-11 h-6 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={formData.isCloseBox} 
                      onChange={e => setFormData({...formData, isCloseBox: e.target.checked})} 
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff751f]"></div>
                  </label>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={closeModal} className="flex-1 py-3 border rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition">Cancel</button>
                <button type="submit" className="flex-[2] bg-[#ff751f] hover:bg-[#e66416] py-3 rounded-xl font-bold text-white shadow-md active:scale-95 transition-all">Save Parcel & Entry</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast */}
      <div className={`fixed top-5 right-5 bg-green-600 text-white px-6 py-3 rounded-lg shadow-xl transition-transform duration-500 z-[100] flex items-center ${showToast ? 'translate-x-0' : 'translate-x-[150%]'}`}>
        <i className="fas fa-check-circle mr-3"></i> Parcel successfully entered!
      </div>
    </div>
  );
};

export default App;
