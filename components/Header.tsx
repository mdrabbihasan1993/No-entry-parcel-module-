
import React from 'react';
import { COLORS } from '../constants';
import { Bell, Search, User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 flex justify-between items-center px-4 lg:px-8">
      <div className="flex items-center gap-4 flex-1">
        <h2 className="text-xl font-bold tracking-tight text-slate-800 hidden md:block">Merchant Portal</h2>
        <div className="relative max-w-md w-full ml-4 hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search parcels..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 ring-orange-400 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 lg:gap-6">
        <button className="p-2 rounded-full hover:bg-slate-100 text-slate-600 relative transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-[1px] bg-gray-200"></div>

        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-800 group-hover:text-orange-500 transition-colors">Rahat Enterprise</p>
            <p className="text-[10px] text-gray-500 font-mono tracking-tighter">M-ID: 99281</p>
          </div>
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm shadow-lg shadow-orange-500/20" 
            style={{ backgroundColor: COLORS.orange }}
          >
            RE
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
