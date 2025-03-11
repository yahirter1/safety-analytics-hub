
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Filter, Search, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { securityEvents, SecurityEvent } from "@/data/mockData";
import { useState } from "react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const AccessTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleRows, setVisibleRows] = useState(5);

  const filteredEvents = securityEvents.filter((event) => 
    event.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.device.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, visibleRows);

  const getStatusIcon = (status: SecurityEvent["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getActionBadge = (action: SecurityEvent["action"]) => {
    switch (action) {
      case "login":
        return <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">Inicio de sesión</Badge>;
      case "logout":
        return <Badge variant="outline" className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400">Cierre de sesión</Badge>;
      case "access_denied":
        return <Badge variant="outline" className="bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400">Acceso denegado</Badge>;
      case "password_reset":
        return <Badge variant="outline" className="bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400">Reseteo de contraseña</Badge>;
      case "two_factor":
        return <Badge variant="outline" className="bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">Autenticación 2FA</Badge>;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return format(date, "d MMM, HH:mm", { locale: es });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <Card className="w-full glass-card animate-slide-up">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium flex justify-between items-center">
          <span>Registro de Actividad</span>
          <Button variant="outline" size="sm" className="gap-1">
            <Filter className="h-4 w-4" />
            <span>Filtros</span>
          </Button>
        </CardTitle>
        <CardDescription>
          Eventos recientes de acceso al sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar eventos..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Fecha</TableHead>
                <TableHead>Usuario</TableHead>
                <TableHead>Acción</TableHead>
                <TableHead className="w-[100px]">Estado</TableHead>
                <TableHead className="hidden md:table-cell">Ubicación</TableHead>
                <TableHead className="hidden md:table-cell">Dispositivo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event, index) => (
                <TableRow key={event.id} className="h-16">
                  <TableCell className="font-medium">{formatDate(event.timestamp)}</TableCell>
                  <TableCell>{event.user}</TableCell>
                  <TableCell>{getActionBadge(event.action)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(event.status)}
                      <span className="capitalize text-sm">
                        {event.status === "success" ? "Exitoso" : event.status === "failed" ? "Fallido" : "Pendiente"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{event.location}</TableCell>
                  <TableCell className="hidden md:table-cell">{event.device}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {visibleRows < securityEvents.length && (
          <div className="mt-4 text-center">
            <Button 
              variant="ghost" 
              onClick={() => setVisibleRows(prev => prev + 5)}
              className="text-primary"
            >
              Cargar más
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AccessTable;
