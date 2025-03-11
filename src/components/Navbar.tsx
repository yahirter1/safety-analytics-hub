
import { Bell, Menu, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavbarProps {
  toggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

const Navbar = ({ toggleSidebar, isSidebarOpen }: NavbarProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="h-16 px-4 border-b backdrop-blur-sm dark:bg-background/95 bg-background/80 flex items-center justify-between sticky top-0 z-30 transition-all duration-300">
      <div className="flex items-center">
        {toggleSidebar && !isMobile ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="mr-2"
            aria-label="Toggle sidebar"
          >
            <Menu className={cn(
              "h-5 w-5 transition-transform duration-300",
              isSidebarOpen ? "rotate-90" : "rotate-0"
            )} />
          </Button>
        ) : isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <div className="py-6 px-4 flex flex-col gap-4">
                <p className="text-sm text-muted-foreground font-medium">Dashboard</p>
                <div className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start">Inicio</Button>
                  <Button variant="ghost" className="w-full justify-start">Accesos</Button>
                  <Button variant="ghost" className="w-full justify-start">Usuarios</Button>
                  <Button variant="ghost" className="w-full justify-start">Configuración</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        ) : null}
        <h1 className="text-lg font-medium">Panel de Seguridad</h1>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <Avatar className="h-8 w-8 transition-transform hover:scale-105">
          <AvatarFallback className="bg-primary text-primary-foreground">A</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
