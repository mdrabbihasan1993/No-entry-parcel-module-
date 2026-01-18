
import React from 'react';
import { AlertCircle, Package, History, LayoutDashboard, LogOut } from 'lucide-react';
import { COLORS } from '../constants';

const Sidebar: React.FC = () => {
  return (
    <aside className="fixed inset-y-0 left-0 w-64 text-white hidden lg:flex flex-col z-30" style={{ backgroundColor: COLORS.darkBlue }}>
      <div className="p-6 text-2xl font-bold border-b border-blue-900/50 flex items-center gap-2">
        <span style={{ color: COLORS.orange }}>Fast</span>Courier
      </div>
      
      <nav className="flex-1 p-4 space-y-2 mt-4">
        <a href="#" className="flex items-center p-3 rounded-xl bg-white/10 text-orange-400 font-semibold shadow-inner">
          <AlertCircle className="w-5 h-5 mr-3" />
          NO Entry Parcels
        </a>
        
        <div className="pt-6 pb-2 px-3">
          <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Management</p>
        </div>
        
        <a href="#" className="flex items-center p-3 rounded-xl hover:bg-white/5 text-blue-100 transition-all duration-200 group">
          <LayoutDashboard className="w-5 h-5 mr-3 text-blue-400 group-hover:text-white" />
          Dashboard
        </a>
        <a href="#" className="flex items-center p-3 rounded-xl hover:bg-white/5 text-blue-100 transition-all duration-200 group">
          <Package className="w-5 h-5 mr-3 text-blue-400 group-hover:text-white" />
          Entered Parcels
        </a>
        <a href="#" className="flex items-center p-3 rounded-xl hover:bg-white/5 text-blue-100 transition-all duration-200 group">
          <History className="w-5 h-5 mr-3 text-blue-400 group-hover:text-white" />
          Pickup History
        </a>
      </nav>

      <div className="p-4 border-t border-blue-900/50">
        <button className="flex items-center w-full p-3 rounded-xl hover:bg-red-500/10 text-blue-300 hover:text-red-400 transition-all">
          <LogOut className="w-5 h-5 mr-3" />
          Sign Out
        </button>
        <div className="mt-4 text-[10px] text-blue-400/60 text-center">
          &copy; 2025 Merchant Console v2.4
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
