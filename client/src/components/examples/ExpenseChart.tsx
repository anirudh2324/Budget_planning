import ExpenseChart from '../ExpenseChart';

export default function ExpenseChartExample() {
  // todo: remove mock functionality
  const pieChartData = {
    labels: ['Food & Dining', 'Shopping', 'Transportation', 'Bills & Utilities', 'Entertainment', 'Healthcare'],
    datasets: [{
      data: [850, 450, 320, 1200, 180, 90],
      backgroundColor: [
        'hsl(145, 63%, 49%)', // primary
        'hsl(204, 70%, 53%)', // accent  
        'hsl(283, 39%, 53%)', // insight purple
        'hsl(4, 90%, 58%)',   // warning
        'hsl(43, 89%, 38%)',  // chart-5
        'hsl(210, 17%, 90%)', // secondary
      ],
      borderWidth: 2,
    }]
  };

  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      data: [2800, 3200, 2900, 3400, 3100, 3090],
      backgroundColor: [
        'hsl(145, 63%, 49%)',
        'hsl(204, 70%, 53%)',
        'hsl(283, 39%, 53%)',
        'hsl(4, 90%, 58%)',
        'hsl(43, 89%, 38%)',
        'hsl(145, 63%, 49%)',
      ],
      borderWidth: 2,
    }]
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      <ExpenseChart
        type="pie"
        title="Spending by Category"
        data={pieChartData}
        totalAmount={3090}
        period="December 2024"
      />
      <ExpenseChart
        type="bar"
        title="Monthly Spending Trend"
        data={barChartData}
        totalAmount={18590}
        period="Last 6 Months"
      />
    </div>
  );
}