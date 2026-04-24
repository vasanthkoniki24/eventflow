import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Card from "../ui/Card";

export default function RevenueChart({ revenue }) {
  const data = [
    { month: "Jan", revenue: revenue * 0.1 },
    { month: "Feb", revenue: revenue * 0.2 },
    { month: "Mar", revenue: revenue * 0.35 },
    { month: "Apr", revenue: revenue * 0.5 },
    { month: "May", revenue: revenue * 0.75 },
    { month: "Jun", revenue },
  ];

  return (
    <Card>
      <h3 className="heading-card mb-6">Revenue Trend</h3>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="month" stroke="#8B8E99" />
            <YAxis stroke="#8B8E99" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#C9A84C"
              fill="rgba(201,168,76,0.18)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}