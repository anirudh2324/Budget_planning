import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Home, 
  Upload, 
  PieChart, 
  BarChart3, 
  Moon, 
  Sun,
  DollarSign 
} from "lucide-react";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/upload", label: "Upload", icon: Upload },
  { path: "/analysis", label: "Analysis", icon: PieChart },
  { path: "/reports", label: "Reports", icon: BarChart3 },
];

export default function Navigation() {
  const [location] = useLocation();
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
    console.log("Theme toggled to:", !isDark ? "dark" : "light");
  };

  return (
    <Card className="bg-card border-card-border shadow-sm">
      <div className="flex items-center justify-between p-4">
        {/* Logo */}
        <div className="flex items-center gap-2" data-testid="logo">
          <div className="p-2 bg-primary rounded-lg">
            <DollarSign className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">BudgetTracker</span>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex gap-1" data-testid="nav-tabs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;
            
            return (
              <Link key={item.path} href={item.path}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className="flex items-center gap-2"
                  data-testid={`nav-${item.label.toLowerCase()}`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          data-testid="button-theme-toggle"
        >
          {isDark ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>
    </Card>
  );
}