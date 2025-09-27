import TransactionItem from '../TransactionItem';

export default function TransactionItemExample() {
  return (
    <div className="space-y-3 p-6">
      {/* todo: remove mock functionality */}
      <TransactionItem
        id="1"
        description="Starbucks Coffee"
        amount={4.85}
        category="Food & Dining"
        date="2024-01-15"
        merchant="Starbucks"
        confidence={95}
      />
      <TransactionItem
        id="2"
        description="Amazon Purchase"
        amount={129.99}
        category="Shopping"
        date="2024-01-14"
        merchant="Amazon"
        confidence={88}
      />
      <TransactionItem
        id="3"
        description="Uber Ride"
        amount={22.50}
        category="Transportation"
        date="2024-01-14"
        merchant="Uber"
        confidence={92}
      />
      <TransactionItem
        id="4"
        description="Salary Deposit"
        amount={3500.00}
        category="Income"
        date="2024-01-13"
        merchant="Tech Corp"
        isIncome={true}
        confidence={100}
      />
      <TransactionItem
        id="5"
        description="Netflix Subscription"
        amount={15.99}
        category="Entertainment"
        date="2024-01-12"
        merchant="Netflix"
        confidence={98}
      />
    </div>
  );
}