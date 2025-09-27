import BudgetCard from '../BudgetCard';

export default function BudgetCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {/* todo: remove mock functionality */}
      <BudgetCard 
        category="Food & Dining"
        spent={850}
        budget={1000}
        trend="up"
        trendPercentage={12}
      />
      <BudgetCard 
        category="Shopping"
        spent={450}
        budget={600}
        trend="down"
        trendPercentage={8}
      />
      <BudgetCard 
        category="Transportation"
        spent={320}
        budget={400}
        trend="up"
        trendPercentage={5}
      />
      <BudgetCard 
        category="Bills & Utilities"
        spent={1200}
        budget={1000}
      />
      <BudgetCard 
        category="Entertainment"
        spent={180}
        budget={300}
        trend="down"
        trendPercentage={15}
      />
      <BudgetCard 
        category="Healthcare"
        spent={90}
        budget={200}
      />
    </div>
  );
}