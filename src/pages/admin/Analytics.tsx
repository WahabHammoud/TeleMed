
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from "recharts";

const userRegistrationData = [
  { month: "Jan", count: 12 },
  { month: "Feb", count: 19 },
  { month: "Mar", count: 30 },
  { month: "Apr", count: 27 },
  { month: "May", count: 42 },
  { month: "Jun", count: 54 },
  { month: "Jul", count: 62 },
  { month: "Aug", count: 78 },
  { month: "Sep", count: 85 },
  { month: "Oct", count: 105 },
  { month: "Nov", count: 124 },
  { month: "Dec", count: 155 },
];

const appointmentData = [
  { month: "Jan", completed: 34, cancelled: 5, pending: 12 },
  { month: "Feb", completed: 42, cancelled: 7, pending: 15 },
  { month: "Mar", completed: 52, cancelled: 6, pending: 18 },
  { month: "Apr", completed: 48, cancelled: 9, pending: 14 },
  { month: "May", completed: 62, cancelled: 8, pending: 20 },
  { month: "Jun", completed: 58, cancelled: 10, pending: 16 },
  { month: "Jul", completed: 69, cancelled: 12, pending: 22 },
  { month: "Aug", completed: 73, cancelled: 11, pending: 19 },
  { month: "Sep", completed: 78, cancelled: 9, pending: 24 },
  { month: "Oct", completed: 82, cancelled: 14, pending: 28 },
  { month: "Nov", completed: 91, cancelled: 12, pending: 30 },
  { month: "Dec", completed: 99, cancelled: 15, pending: 35 },
];

const userTypesData = [
  { name: "Patients", value: 845 },
  { name: "Doctors", value: 128 },
  { name: "Admins", value: 7 },
];

const revenueData = [
  { month: "Jan", revenue: 24500 },
  { month: "Feb", revenue: 32800 },
  { month: "Mar", revenue: 41200 },
  { month: "Apr", revenue: 38700 },
  { month: "May", revenue: 45600 },
  { month: "Jun", revenue: 52300 },
  { month: "Jul", revenue: 58900 },
  { month: "Aug", revenue: 63400 },
  { month: "Sep", revenue: 69700 },
  { month: "Oct", revenue: 72100 },
  { month: "Nov", revenue: 78600 },
  { month: "Dec", revenue: 86200 },
];

const consultationsBySpecialty = [
  { name: "Cardiology", count: 145 },
  { name: "Dermatology", count: 132 },
  { name: "Neurology", count: 98 },
  { name: "Pediatrics", count: 165 },
  { name: "Orthopedics", count: 120 },
  { name: "Psychiatry", count: 110 },
  { name: "Gynecology", count: 155 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

export function Analytics() {
  const [dateRange, setDateRange] = useState("yearly");
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Analytics Dashboard</h2>
        <Tabs defaultValue="yearly" value={dateRange} onValueChange={setDateRange}>
          <TabsList>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Registrations</CardTitle>
            <CardDescription>New user signups over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={userRegistrationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>User Types Distribution</CardTitle>
            <CardDescription>Breakdown of user types on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userTypesData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {userTypesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Appointments Statistics</CardTitle>
            <CardDescription>Number of appointments by status</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={appointmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" fill="#4CAF50" />
                <Bar dataKey="pending" fill="#2196F3" />
                <Bar dataKey="cancelled" fill="#F44336" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
            <CardDescription>Monthly revenue in USD</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Consultations by Specialty</CardTitle>
            <CardDescription>Number of consultations performed by medical specialty</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={consultationsBySpecialty} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
