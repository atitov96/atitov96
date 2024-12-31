import { useState, useRef, useEffect } from 'react';
import { CheckCircle2, Circle, Clock, XCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Status = 'done' | 'in-progress' | 'skip' | undefined;

interface StatusButtonProps {
  status?: Status;
  onChange: (status: Status) => void;
}

const statusConfig = {
  done: {
    icon: CheckCircle2,
    color: 'text-green-500',
    bg: 'bg-green-100',
    label: 'Выполнено'
  },
  'in-progress': {
    icon: Clock,
    color: 'text-yellow-500',
    bg: 'bg-yellow-100',
    label: 'В процессе'
  },
  skip: {
    icon: XCircle,
    color: 'text-gray-400',
    bg: 'bg-gray-100',
    label: 'Пропущено'
  },
  undefined: {
    icon: Circle,
    color: 'text-gray-400',
    bg: 'bg-gray-100',
    label: 'Ожидает'
  }
};

export function StatusButton({ status, onChange }: StatusButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentStatus = statusConfig[status || 'undefined'];
  const Icon = currentStatus.icon;

  return (
    <div ref={buttonRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${currentStatus.bg} hover:opacity-90 transition-all`}
      >
        <Icon className={`w-5 h-5 ${currentStatus.color}`} />
        <span className={`text-sm font-medium ${currentStatus.color}`}>
          {currentStatus.label}
        </span>
        <ChevronDown className={`w-4 h-4 ${currentStatus.color}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-1 bg-white rounded-md shadow-lg z-50"
          >
            {Object.entries(statusConfig).map(([key, config]) => {
              const StatusIcon = config.icon;
              return (
                <button
                  key={key}
                  onClick={() => {
                    onChange(key as Status);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-50 ${
                    status === key ? 'bg-gray-50' : ''
                  }`}
                >
                  <StatusIcon className={`w-5 h-5 ${config.color}`} />
                  <span className="text-sm">{config.label}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
