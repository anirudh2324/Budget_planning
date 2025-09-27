import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ShoppingBag, 
  Coffee, 
  Car, 
  Home, 
  Gamepad2, 
  Heart,
  MoreHorizontal,
  TrendingUp,
  TrendingDown
} from "lucide-react";

interface TransactionItemProps {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  merchant?: string;
  isIncome?: boolean;
  confidence?: number;
}

const categoryIcons = {
  "Food & Dining": Coffee,
  "Shopping": ShoppingBag,
  "Transportation": Car,
  "Bills & Utilities": Home,
  "Entertainment": Gamepad2,
  "Healthcare": Heart,
};

export default function TransactionItem({
  id,
  description,
  amount,
  category,
  date,
  merchant,
  isIncome = false,
  confidence = 95
}: TransactionItemProps) {
  const IconComponent = categoryIcons[category as keyof typeof categoryIcons] || ShoppingBag;
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getConfidenceColor = () => {
    if (confidence >= 90) return "primary";
    if (confidence >= 70) return "accent"; 
    return "secondary";
  };

  return (
    <Card className="hover-elevate" data-testid={`transaction-${id}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-4">
          {/* Icon and Details */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="p-2 bg-muted rounded-lg flex-shrink-0">
              <IconComponent className="h-4 w-4 text-muted-foreground" />
            </div>
            
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium text-sm truncate" data-testid={`text-description-${id}`}>
                  {description}
                </h4>
                <Badge 
                  variant={getConfidenceColor() as any}
                  className="text-xs px-1 py-0"
                  data-testid={`badge-confidence-${id}`}
                >
                  {confidence}%
                </Badge>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span data-testid={`text-category-${id}`}>{category}</span>
                <span>•</span>
                <span data-testid={`text-date-${id}`}>{formatDate(date)}</span>
                {merchant && (
                  <>
                    <span>•</span>
                    <span data-testid={`text-merchant-${id}`}>{merchant}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Amount and Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="text-right">
              <div className={`font-semibold ${
                isIncome ? 'text-primary' : 'text-foreground'
              }`} data-testid={`text-amount-${id}`}>
                {isIncome ? '+' : '-'}₹{Math.abs(amount).toLocaleString()}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                {isIncome ? (
                  <TrendingUp className="h-3 w-3 text-primary" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span>{isIncome ? 'Income' : 'Expense'}</span>
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8"
              onClick={() => console.log(`Transaction ${id} options clicked`)}
              data-testid={`button-options-${id}`}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}