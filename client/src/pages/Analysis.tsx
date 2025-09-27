import { useState } from "react";
import TransactionItem from "@/components/TransactionItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Download,
  Calendar,
  TrendingUp,
  PieChart,
  Edit3
} from "lucide-react";

export default function Analysis() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dateRange, setDateRange] = useState("month");

  // todo: remove mock functionality
  const transactions = [
    {
      id: "1",
      description: "Starbucks Coffee",
      amount: 4.85,
      category: "Food & Dining",
      date: "2024-01-15",
      merchant: "Starbucks",
      confidence: 95,
    },
    {
      id: "2",
      description: "Amazon Purchase",
      amount: 129.99,
      category: "Shopping",
      date: "2024-01-14",
      merchant: "Amazon",
      confidence: 88,
    },
    {
      id: "3",
      description: "Uber Ride",
      amount: 22.50,
      category: "Transportation",
      date: "2024-01-14",
      merchant: "Uber",
      confidence: 92,
    },
    {
      id: "4",
      description: "Netflix Subscription",
      amount: 15.99,
      category: "Entertainment",
      date: "2024-01-12",
      merchant: "Netflix",
      confidence: 98,
    },
    {
      id: "5",
      description: "Grocery Store",
      amount: 87.43,
      category: "Food & Dining",
      date: "2024-01-11",
      merchant: "Safeway",
      confidence: 97,
    },
    {
      id: "6",
      description: "Gas Station",
      amount: 45.20,
      category: "Transportation",
      date: "2024-01-10",
      merchant: "Shell",
      confidence: 94,
    },
  ];

  const categories = [
    "Food & Dining",
    "Shopping", 
    "Transportation",
    "Bills & Utilities",
    "Entertainment",
    "Healthcare"
  ];

  const categoryStats = [
    { name: "Food & Dining", amount: 942.28, count: 23, trend: "up", percentage: 8 },
    { name: "Shopping", amount: 579.97, count: 12, trend: "down", percentage: 5 },
    { name: "Transportation", amount: 387.70, count: 18, trend: "up", percentage: 12 },
    { name: "Bills & Utilities", amount: 1200.00, count: 4, trend: "up", percentage: 2 },
    { name: "Entertainment", amount: 231.94, count: 8, trend: "down", percentage: 15 },
    { name: "Healthcare", amount: 150.00, count: 2, trend: "up", percentage: 25 },
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.merchant?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || transaction.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleExport = () => {
    console.log("Exporting transactions data");
    // todo: remove mock functionality
  };

  const handleEditCategory = (transactionId: string) => {
    console.log("Edit category for transaction:", transactionId);
    // todo: remove mock functionality
  };

  return (
    <div className="space-y-6 p-6" data-testid="page-analysis">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Transaction Analysis</h1>
          <p className="text-muted-foreground">
            Review and manage your categorized transactions
          </p>
        </div>
        <Button onClick={handleExport} data-testid="button-export-data">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      <Tabs defaultValue="transactions" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="transactions" data-testid="tab-transactions">
            Transactions
          </TabsTrigger>
          <TabsTrigger value="categories" data-testid="tab-categories">
            By Category
          </TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-6">
          {/* Filters */}
          <Card data-testid="filters-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search transactions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                      data-testid="input-search"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger data-testid="select-category">
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Range</label>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger data-testid="select-date-range">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">This week</SelectItem>
                      <SelectItem value="month">This month</SelectItem>
                      <SelectItem value="quarter">This quarter</SelectItem>
                      <SelectItem value="year">This year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("all");
                      setDateRange("month");
                    }}
                    data-testid="button-clear-filters"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transaction Results */}
          <Card data-testid="transactions-results">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  Transactions ({filteredTransactions.length})
                </CardTitle>
                <Badge variant="secondary">
                  <Calendar className="h-3 w-3 mr-1" />
                  December 2024
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {filteredTransactions.map((transaction, index) => (
                  <div 
                    key={transaction.id} 
                    className={`p-4 ${index !== 0 ? "border-t" : ""} hover:bg-muted/50 group`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <TransactionItem {...transaction} />
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleEditCategory(transaction.id)}
                        data-testid={`button-edit-${transaction.id}`}
                      >
                        <Edit3 className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          {/* Category Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryStats.map((category) => (
              <Card key={category.name} className="hover-elevate" data-testid={`category-${category.name.toLowerCase().replace(/\s+/g, '-')}`}>
                <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-3">
                  <CardTitle className="text-base font-medium">
                    {category.name}
                  </CardTitle>
                  <div className="flex items-center gap-1">
                    {category.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-destructive" />
                    ) : (
                      <TrendingUp className="h-4 w-4 text-primary rotate-180" />
                    )}
                    <span className={`text-xs ${
                      category.trend === "up" ? "text-destructive" : "text-primary"
                    }`}>
                      {category.percentage}%
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    <div className="text-2xl font-bold">
                      ${category.amount.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {category.count} transactions
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => setSelectedCategory(category.name)}
                    data-testid={`button-view-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <PieChart className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}