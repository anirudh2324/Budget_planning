import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Download, Calendar } from "lucide-react";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    borderColor?: string[];
    borderWidth?: number;
  }[];
}

interface ExpenseChartProps {
  type: "pie" | "bar";
  title: string;
  data: ChartData;
  totalAmount?: number;
  period?: string;
  showDownload?: boolean;
}

export default function ExpenseChart({ 
  type, 
  title, 
  data, 
  totalAmount, 
  period = "This Month",
  showDownload = true 
}: ExpenseChartProps) {
  const getPieOptions = () => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const value = context.parsed || context.raw;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ₹${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
  });

  const getBarOptions = () => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const value = context.parsed.y || context.raw;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ₹${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '₹' + value.toLocaleString();
          },
        },
      },
    },
  });

  const renderChart = () => {
    if (type === "pie") {
      return (
        <div className="h-80 w-full" data-testid={`chart-pie-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          <Doughnut data={data} options={getPieOptions()} />
        </div>
      );
    } else {
      return (
        <div className="h-80 w-full" data-testid={`chart-bar-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          <Bar data={data} options={getBarOptions()} />
        </div>
      );
    }
  };

  const handleDownload = () => {
    console.log(`Downloading ${title} chart data`);
    // todo: remove mock functionality - implement actual download
  };

  const handlePeriodChange = () => {
    console.log(`Changing period for ${title}`);
    // todo: remove mock functionality - implement period selector
  };

  return (
    <Card className="hover-elevate" data-testid={`expense-chart-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              <Calendar className="h-3 w-3 mr-1" />
              {period}
            </Badge>
            {totalAmount && (
              <Badge variant="outline" className="text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                ₹{totalAmount.toLocaleString()} total
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePeriodChange}
            data-testid={`button-period-${title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <Calendar className="h-4 w-4 mr-1" />
            Period
          </Button>
          {showDownload && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              data-testid={`button-download-${title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-2">
        {renderChart()}
      </CardContent>
    </Card>
  );
}