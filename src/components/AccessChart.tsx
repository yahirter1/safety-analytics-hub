
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { accessStats } from "@/data/mockData";

const AccessChart = () => {
  const [activeTab, setActiveTab] = useState("area");

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 shadow-lg border-none">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-green-500">
            Exitosos: {payload[0].value}
          </p>
          <p className="text-sm text-red-500">
            Fallidos: {payload[1].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full glass-card animate-scale-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium flex justify-between items-center">
          <span>Estadísticas de Acceso</span>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-[180px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="area">Área</TabsTrigger>
              <TabsTrigger value="bar">Barras</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardTitle>
        <CardDescription>
          Vista general de los intentos de acceso durante la última semana
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4 h-[300px]">
        <TabsContent value="area" className="h-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={accessStats}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorSuccessful" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorFailed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="successful"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorSuccessful)"
                animationDuration={1000}
              />
              <Area
                type="monotone"
                dataKey="failed"
                stroke="hsl(var(--destructive))"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorFailed)"
                animationDuration={1000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </TabsContent>
        <TabsContent value="bar" className="h-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={accessStats}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar
                dataKey="successful"
                name="Exitosos"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
              />
              <Bar
                dataKey="failed"
                name="Fallidos"
                fill="hsl(var(--destructive))"
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
              />
            </BarChart>
          </ResponsiveContainer>
        </TabsContent>
      </CardContent>
    </Card>
  );
};

export default AccessChart;
