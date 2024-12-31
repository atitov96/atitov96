"use client";
import Link from 'next/link';
import { 
  Code2 as GoIcon,
  PanelLeft as PythonIcon,
  Database as SqlIcon, 
  Server as ApiIcon, 
  Activity as BackendIcon,
  Boxes as SystemDesignIcon,
  GitBranch as GitIcon,
  Cpu as RustIcon,
  Container as DockerIcon,
  Cloud as AwsIcon,
  Terminal as LinuxIcon,
  Bot as PromptIcon,
  Menu,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const currentPath = pathname.split('/')[1];

  const routes = [
    { path: 'golang', icon: GoIcon, label: 'Go' },
    { path: 'python', icon: PythonIcon, label: 'Python' },
    { path: 'backend', icon: BackendIcon, label: 'Backend' },
    { path: 'systemDesign', icon: SystemDesignIcon, label: 'System Design' },
    { path: 'api', icon: ApiIcon, label: 'API' },
    { path: 'sql', icon: SqlIcon, label: 'SQL' },
    { path: 'git', icon: GitIcon, label: 'Git' },
    { path: 'rust', icon: RustIcon, label: 'Rust' },
    { path: 'docker', icon: DockerIcon, label: 'Docker' },
    { path: 'aws', icon: AwsIcon, label: 'AWS' },
    { path: 'linux', icon: LinuxIcon, label: 'Linux' },
    { path: 'prompt', icon: PromptIcon, label: 'Prompt' },
  ];

  const mainRoutes = routes.slice(0, 4);
  const additionalRoutes = routes.slice(4);

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gray-800">
        <div className="flex justify-around items-center p-4">
          {mainRoutes.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              href={`/${path}`}
              className={`flex flex-col items-center ${
                currentPath === path ? 'text-blue-400' : 'text-white'
              }`}
            >
              <Icon size={24} />
              <span className="text-xs mt-1">{label}</span>
            </Link>
          ))}
          <button
            onClick={() => setIsOpen(true)}
            className="flex flex-col items-center text-white"
          >
            <Menu size={24} />
            <span className="text-xs mt-1">More</span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-50"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed bottom-0 left-0 right-0 bg-gray-800 z-50 rounded-t-xl shadow-xl"
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white text-lg font-semibold">More</h3>
                  <button onClick={() => setIsOpen(false)} className="text-white">
                    <X size={24} />
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {additionalRoutes.map(({ path, icon: Icon, label }) => (
                    <Link
                      key={path}
                      href={`/${path}`}
                      onClick={() => setIsOpen(false)}
                      className={`flex flex-col items-center p-2 rounded-lg ${
                        currentPath === path 
                          ? 'text-blue-400 bg-gray-700' 
                          : 'text-white hover:bg-gray-700'
                      }`}
                    >
                      <Icon size={24} />
                      <span className="text-xs mt-1 text-center">{label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
