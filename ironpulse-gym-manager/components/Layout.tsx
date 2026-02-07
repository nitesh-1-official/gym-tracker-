import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  BellRing, 
  Settings, 
  LogOut,
  Menu,
  X,
  Dumbbell
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Members', path: '/members' },
    { icon: CreditCard, label: 'Payments', path: '/payments' },
    { icon: BellRing, label: 'Reminders', path: '/reminders' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="flex h-screen bg-gym-900 text-slate-100 overflow-hidden">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed md:relative z-30 flex flex-col w-64 h-full bg-gym-800 border-r border-gym-700 transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="flex items-center justify-center h-16 border-b border-gym-700 bg-gym-900/50">
          <div className="flex items-center space-x-2 text-gym-accent">
            <Dumbbell className="w-8 h-8" />
            <span className="text-xl font-bold tracking-wider text-white">IRON<span className="text-gym-accent">PULSE</span></span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) => `
                flex items-center px-4 py-3 rounded-lg transition-colors duration-200
                ${isActive 
                  ? 'bg-gym-accent/10 text-gym-accent border border-gym-accent/20' 
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-100'}
              `}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gym-700">
          <button
            onClick={onLogout}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-slate-400 transition-colors rounded-lg hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        {/* Mobile Header */}
        <header className="flex items-center justify-between px-4 py-3 bg-gym-800 border-b border-gym-700 md:hidden">
          <div className="flex items-center space-x-2">
            <Dumbbell className="w-6 h-6 text-gym-accent" />
            <span className="font-bold text-white">IronPulse</span>
          </div>
          <button onClick={toggleSidebar} className="p-2 text-slate-300 rounded-md hover:bg-slate-700">
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 overflow-y-auto md:p-8 bg-gym-900 scroll-smooth">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;