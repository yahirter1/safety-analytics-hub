
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Lock, Settings, Users, Activity, Menu, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  isActive: boolean;
}

const SidebarItem = ({ icon: Icon, label, to, isActive }: SidebarItemProps) => {
  return (
    <Link to={to} className="w-full">
      <Button
        variant={isActive ? "secondary" : "ghost"}
        size="lg"
        className={cn(
          "w-full justify-start gap-3 mb-1 relative",
          isActive && "font-medium"
        )}
      >
        <Icon className="h-5 w-5" />
        <span>{label}</span>
        {isActive && (
          <motion.div
            layoutId="active-indicator"
            className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </Button>
    </Link>
  );
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const routes = [
    { icon: Home, label: "Inicio", path: "/" },
    { icon: Activity, label: "Actividad", path: "/activity" },
    { icon: Users, label: "Usuarios", path: "/users" },
    { icon: Lock, label: "Permisos", path: "/permissions" },
    { icon: Settings, label: "Configuración", path: "/settings" },
  ];

  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        isSidebarOpen={isSidebarOpen} 
      />
      <div className="flex flex-1 overflow-hidden">
        <AnimatePresence>
          {isSidebarOpen && !isMobile && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ 
                width: 250, 
                opacity: 1,
                transition: { 
                  width: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                  opacity: { duration: 0.2, delay: 0.1 } 
                }
              }}
              exit={{ 
                width: 0, 
                opacity: 0,
                transition: { 
                  width: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                  opacity: { duration: 0.1 } 
                }
              }}
              className="h-[calc(100vh-4rem)] flex-shrink-0 border-r bg-sidebar overflow-auto"
            >
              <div className="p-4 space-y-4">
                <div className="mb-6 flex justify-between items-center">
                  <h2 className="font-medium text-lg">Panel de Control</h2>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsSidebarOpen(false)}
                    className="lg:hidden"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                </div>
                <nav className="space-y-1">
                  {routes.map((route) => (
                    <SidebarItem
                      key={route.path}
                      icon={route.icon}
                      label={route.label}
                      to={route.path}
                      isActive={location.pathname === route.path}
                    />
                  ))}
                </nav>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
