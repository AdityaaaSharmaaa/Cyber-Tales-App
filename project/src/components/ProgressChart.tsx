import { ProgressChart as ChartType } from '../types/dashboard';

interface ProgressChartProps {
  data: ChartType;
}

export const ProgressChart = ({ data }: ProgressChartProps) => {
  return (
    <div className="w-full h-64 bg-gray-50 rounded-lg p-4">
      {/* This is a placeholder. You can integrate a chart library like Chart.js or Recharts */}
      <div className="h-full flex items-center justify-center text-gray-500">
        <div>
          <p className="text-center mb-2">Chart Placeholder</p>
          <p className="text-sm">Labels: {data.labels.join(', ')}</p>
          <p className="text-sm">Values: {data.datasets[0].data.join(', ')}</p>
        </div>
      </div>
    </div>
  );
}; 