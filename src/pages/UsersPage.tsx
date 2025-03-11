
import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { userActivities } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, UserPlus, Filter, MoreHorizontal, Check, Ban } from "lucide-react";

const UsersPage = () => {
  const [activeTab, setActiveTab] = useState("todos");
  
  const getRoleColor = (role: string) => {
    switch (role) {
      case "Administrador":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      case "Gerente":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "Analista":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "Desarrollador":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
      case "Soporte":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "online":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800">
            <Check className="h-3 w-3 mr-1" /> Activo
          </Badge>
        );
      case "idle":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800">
            <span className="h-2 w-2 rounded-full bg-yellow-500 mr-1 inline-block"></span> Inactivo
          </Badge>
        );
      case "offline":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700">
            <Ban className="h-3 w-3 mr-1" /> Desconectado
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">Desconocido</Badge>
        );
    }
  };

  // Expanded mock data with more users for the users page
  const users = [
    ...userActivities,
    {
      user: "Ana Perez",
      avatar: "AP",
      status: "online",
      lastActive: "Activo ahora",
      role: "Analista",
      accessCount: 9
    },
    {
      user: "Roberto Sanchez",
      avatar: "RS",
      status: "offline",
      lastActive: "Hace 1 día",
      role: "Desarrollador",
      accessCount: 6
    },
    {
      user: "Elena Torres",
      avatar: "ET",
      status: "idle",
      lastActive: "Hace 15 minutos",
      role: "Gerente",
      accessCount: 14
    }
  ];

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h2>
              <p className="text-muted-foreground">
                Administra los usuarios del sistema y sus permisos
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                Filtrar
              </Button>
              <Button size="sm" className="gap-1">
                <UserPlus className="h-4 w-4" />
                Añadir Usuario
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Buscar usuarios..."
                className="pl-8 h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>

          <Card>
            <CardHeader className="pb-1">
              <CardTitle>Usuarios del Sistema</CardTitle>
              <CardDescription>
                Todos los usuarios registrados en la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="todos" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="todos">Todos</TabsTrigger>
                  <TabsTrigger value="activos">Activos</TabsTrigger>
                  <TabsTrigger value="inactivos">Inactivos</TabsTrigger>
                  <TabsTrigger value="administradores">Administradores</TabsTrigger>
                </TabsList>
                
                <TabsContent value="todos">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Usuario</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Rol</TableHead>
                        <TableHead>Última actividad</TableHead>
                        <TableHead>Accesos</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.user}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                  {user.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div className="font-medium">{user.user}</div>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(user.status)}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getRoleColor(user.role)}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.lastActive}</TableCell>
                          <TableCell>{user.accessCount}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="activos">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Usuario</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Rol</TableHead>
                        <TableHead>Última actividad</TableHead>
                        <TableHead>Accesos</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users
                        .filter(user => user.status === "online")
                        .map((user) => (
                          <TableRow key={user.user}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                    {user.avatar}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="font-medium">{user.user}</div>
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(user.status)}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={getRoleColor(user.role)}>
                                {user.role}
                              </Badge>
                            </TableCell>
                            <TableCell>{user.lastActive}</TableCell>
                            <TableCell>{user.accessCount}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                {/* Additional tab contents would follow the same pattern */}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default UsersPage;
