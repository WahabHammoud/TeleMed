
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

// Sample data - replace with real data from your backend
const userRegistrationData = [
  { month: "Jan", count: 12 },
  { month: "Feb", count: 19 },
  { month: "Mar", count: 30 },
  { month: "Apr", count: 27 },
  { month: "May", count: 42 },
  { month: "Jun", count: 54 },
];

const appointmentData = [
  { month: "Jan", completed: 34, cancelled: 5, pending: 12 },
  { month: "Feb", completed: 42, cancelled: 7, pending: 15 },
  { month: "Mar", completed: 52, cancelled: 6, pending: 18 },
  { month: "Apr", completed: 48, cancelled: 9, pending: 14 },
  { month: "May", completed: 62, cancelled: 8, pending: 20 },
  { month: "Jun", completed: 58, cancelled: 10, pending: 16 },
];

const userTypesData = [
  { name: "Patients", value: 845 },
  { name: "Doctors", value: 128 },
  { name: "Admins", value: 7 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export function Analytics() {
  const [dateRange, setDateRange] = useState("monthly");
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Analytics Dashboard</h2>
        <Tabs defaultValue="monthly" value={dateRange} onValueChange={setDateRange}>
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
        
        <Card className="md:col-span-2">
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
      </div>
    </div>
  );
}
