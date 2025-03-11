
export interface SecurityEvent {
  id: string;
  timestamp: string;
  user: string;
  action: "login" | "logout" | "access_denied" | "password_reset" | "two_factor";
  status: "success" | "failed" | "pending";
  location: string;
  device: string;
  ip: string;
}

export interface AccessStat {
  date: string;
  successful: number;
  failed: number;
}

export interface UserActivity {
  user: string;
  avatar: string;
  status: "online" | "offline" | "idle";
  lastActive: string;
  role: string;
  accessCount: number;
}

// Mock security event data
export const securityEvents: SecurityEvent[] = [
  {
    id: "se-001",
    timestamp: "2023-10-15T08:23:45",
    user: "admin@company.com",
    action: "login",
    status: "success",
    location: "Madrid, ES",
    device: "MacBook Pro (Chrome)",
    ip: "192.168.1.1"
  },
  {
    id: "se-002",
    timestamp: "2023-10-15T09:12:32",
    user: "maria.garcia@company.com",
    action: "login",
    status: "success",
    location: "Barcelona, ES",
    device: "iPhone 13 (Safari)",
    ip: "192.168.2.5"
  },
  {
    id: "se-003",
    timestamp: "2023-10-15T10:05:18",
    user: "unknown@domain.com",
    action: "login",
    status: "failed",
    location: "Unknown",
    device: "Windows PC (Firefox)",
    ip: "45.23.12.44"
  },
  {
    id: "se-004",
    timestamp: "2023-10-15T11:34:51",
    user: "carlos.rodriguez@company.com",
    action: "two_factor",
    status: "success",
    location: "Valencia, ES",
    device: "Android (Chrome)",
    ip: "192.168.4.12"
  },
  {
    id: "se-005",
    timestamp: "2023-10-15T12:45:02",
    user: "lucia.fernandez@company.com",
    action: "password_reset",
    status: "success",
    location: "Seville, ES",
    device: "iPad (Safari)",
    ip: "192.168.5.23"
  },
  {
    id: "se-006",
    timestamp: "2023-10-15T14:22:17",
    user: "javier.martinez@company.com",
    action: "login",
    status: "failed",
    location: "Malaga, ES",
    device: "Windows PC (Chrome)",
    ip: "192.168.6.45"
  },
  {
    id: "se-007",
    timestamp: "2023-10-15T15:10:33",
    user: "admin@company.com",
    action: "logout",
    status: "success",
    location: "Madrid, ES",
    device: "MacBook Pro (Chrome)",
    ip: "192.168.1.1"
  },
  {
    id: "se-008",
    timestamp: "2023-10-15T16:05:29",
    user: "sofia.lopez@company.com",
    action: "login",
    status: "success",
    location: "Bilbao, ES",
    device: "iPhone 12 (Safari)",
    ip: "192.168.8.32"
  },
  {
    id: "se-009",
    timestamp: "2023-10-15T17:28:41",
    user: "unknown@attacker.com",
    action: "access_denied",
    status: "failed",
    location: "Unknown",
    device: "Unknown",
    ip: "58.34.12.156"
  },
  {
    id: "se-010",
    timestamp: "2023-10-15T18:42:55",
    user: "miguel.sanchez@company.com",
    action: "login",
    status: "success",
    location: "Zaragoza, ES",
    device: "Windows PC (Edge)",
    ip: "192.168.10.77"
  }
];

// Access statistics for chart
export const accessStats: AccessStat[] = [
  { date: "Oct 9", successful: 45, failed: 4 },
  { date: "Oct 10", successful: 52, failed: 6 },
  { date: "Oct 11", successful: 48, failed: 3 },
  { date: "Oct 12", successful: 50, failed: 2 },
  { date: "Oct 13", successful: 55, failed: 8 },
  { date: "Oct 14", successful: 60, failed: 5 },
  { date: "Oct 15", successful: 58, failed: 7 }
];

// User activity data
export const userActivities: UserActivity[] = [
  {
    user: "Admin",
    avatar: "A",
    status: "online",
    lastActive: "Activo ahora",
    role: "Administrador",
    accessCount: 24
  },
  {
    user: "María García",
    avatar: "MG",
    status: "online",
    lastActive: "Activo ahora",
    role: "Gerente",
    accessCount: 18
  },
  {
    user: "Carlos Rodríguez",
    avatar: "CR",
    status: "idle",
    lastActive: "Hace 10 minutos",
    role: "Analista",
    accessCount: 12
  },
  {
    user: "Lucía Fernández",
    avatar: "LF",
    status: "offline",
    lastActive: "Hace 2 horas",
    role: "Desarrollador",
    accessCount: 8
  },
  {
    user: "Javier Martínez",
    avatar: "JM",
    status: "offline",
    lastActive: "Hace 5 horas",
    role: "Soporte",
    accessCount: 15
  }
];

// Security metrics
export const securityMetrics = {
  totalAccesses: 328,
  successfulLogins: 295,
  failedAttempts: 33,
  averageLoginTime: "1.2s",
  suspiciousActivities: 12,
  securityScore: 92
};
