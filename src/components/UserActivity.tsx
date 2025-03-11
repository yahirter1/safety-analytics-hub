
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserActivity as UserActivityType, userActivities } from "@/data/mockData";
import { cn } from "@/lib/utils";

const UserActivity = () => {
  const getStatusColor = (status: UserActivityType["status"]) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "idle":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <Card className="glass-card h-full animate-slide-up">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium">
          Usuarios Activos
        </CardTitle>
        <CardDescription>
          Actividad reciente de los usuarios
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0">
          {userActivities.map((user, i) => (
            <div 
              key={user.user} 
              className={cn(
                "flex items-center justify-between py-3 px-6",
                i !== userActivities.length - 1 && "border-b"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-10 w-10 transition-transform hover:scale-105">
                    <AvatarFallback className="bg-primary/10 text-primary">{user.avatar}</AvatarFallback>
                  </Avatar>
                  <div className={cn(
                    "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-gray-800",
                    getStatusColor(user.status)
                  )} />
                </div>
                <div>
                  <p className="font-medium leading-none mb-1">{user.user}</p>
                  <p className="text-sm text-muted-foreground">{user.lastActive}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium">{user.role}</span>
                <span className="text-xs text-muted-foreground">{user.accessCount} accesos</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserActivity;
