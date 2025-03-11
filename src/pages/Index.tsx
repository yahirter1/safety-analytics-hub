
import { Shield, Lock, UserCheck, AlertTriangle } from "lucide-react";
import DashboardLayout from "@/layouts/DashboardLayout";
import PageTransition from "@/components/PageTransition";
import SecurityCard from "@/components/SecurityCard";
import AccessChart from "@/components/AccessChart";
import AccessTable from "@/components/AccessTable";
import UserActivity from "@/components/UserActivity";
import { securityMetrics } from "@/data/mockData";

const Index = () => {
  return (
    <PageTransition>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center">
            <h1 className="text-2xl font-semibold">Panel de Seguridad</h1>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SecurityCard
              title="Accesos Totales"
              value={securityMetrics.totalAccesses.toString()}
              icon={Shield}
              trend={{ value: 12, isPositive: true }}
              delay={0}
            />
            <SecurityCard
              title="Inicios Exitosos"
              value={securityMetrics.successfulLogins.toString()}
              icon={UserCheck}
              trend={{ value: 8, isPositive: true }}
              delay={1}
            />
            <SecurityCard
              title="Intentos Fallidos"
              value={securityMetrics.failedAttempts.toString()}
              icon={AlertTriangle}
              trend={{ value: 5, isPositive: false }}
              delay={2}
            />
            <SecurityCard
              title="Puntuación de Seguridad"
              value={`${securityMetrics.securityScore}/100`}
              icon={Lock}
              trend={{ value: 3, isPositive: true }}
              delay={3}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AccessChart />
            </div>
            <div>
              <UserActivity />
            </div>
          </div>
          
          <div>
            <AccessTable />
          </div>
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default Index;
