import BudgetSummary from '../BudgetSummary';

export default function BudgetSummaryExample() {
  return (
    <div className="p-6">
      {/* todo: remove mock functionality */}
      <BudgetSummary
        totalBudget={5000}
        totalSpent={3850}
        monthlyIncome={6500}
        period="December 2024"
      />
    </div>
  );
}