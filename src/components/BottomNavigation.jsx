import { Link, useLocation } from 'react-router-dom';
import { soundManager } from '../utils/sounds';

export default function BottomNavigation() {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: '🏠', label: 'Home', color: 'cyan', clickable: true },
    { path: '/nos', icon: '🔗', label: 'Nodes', color: 'blue', clickable: true },
    { path: '/manifesto', icon: '📖', label: 'Docs', color: 'purple', clickable: true },
    { path: null, icon: '💎', label: '$NEEO', color: 'green', clickable: false },
  ];

  const getColorClass = (color, isActive) => {
    const colors = {
      cyan: isActive ? 'text-cyan-400' : 'text-gray-500',
      blue: isActive ? 'text-blue-400' : 'text-gray-500',
      purple: isActive ? 'text-purple-400' : 'text-gray-500',
      green: isActive ? 'text-green-400' : 'text-gray-500',
    };
    return colors[color] || colors.cyan;
  };

  return (
    <nav className="ios-bottom-nav">
      <div className="flex items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = item.clickable && location.pathname === item.path;
          const colorClass = getColorClass(item.color, isActive);
          
          const content = (
            <div 
              className={`relative flex flex-col items-center justify-center py-2 px-3 flex-1 transition-all ${colorClass} ${
                !item.clickable ? 'opacity-40 cursor-default' : isActive ? 'scale-105' : 'haptic-light'
              }`}
              style={{
                pointerEvents: item.clickable ? 'auto' : 'none'
              }}
            >
              <span className="text-xl mb-1">{item.icon}</span>
              <span className="text-[10px] font-medium tracking-wide">
                {item.label}
              </span>
              {isActive && (
                <div 
                  className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-8 h-1 rounded-full bg-current opacity-80"
                ></div>
              )}
            </div>
          );
          
          return (
            <div key={item.path || item.label} className="flex items-center flex-1">
              {item.clickable ? (
                <Link
                  to={item.path}
                  onClick={() => {
                    if (!isActive) {
                      soundManager.playNavigate();
                    } else {
                      soundManager.playClick();
                    }
                  }}
                  className="w-full"
                >
                  {content}
                </Link>
              ) : (
                content
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}

