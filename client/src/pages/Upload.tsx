import FileUpload from "@/components/FileUpload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Zap, 
  Shield, 
  Clock,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { Link } from "wouter";

export default function Upload() {
  return (
    <div className="space-y-8 p-6" data-testid="page-upload">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Upload & Categorize</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Upload your bank statements, receipts, or paste transaction text. 
          Our AI will automatically categorize your expenses for smarter budgeting.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="text-center hover-elevate" data-testid="feature-ai-powered">
          <CardHeader>
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-lg">AI-Powered Categorization</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Advanced AI automatically categorizes transactions with 95%+ accuracy
            </p>
          </CardContent>
        </Card>

        <Card className="text-center hover-elevate" data-testid="feature-secure">
          <CardHeader>
            <div className="mx-auto w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <Shield className="h-6 w-6 text-accent" />
            </div>
            <CardTitle className="text-lg">Secure & Private</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Your financial data is processed securely and never stored permanently
            </p>
          </CardContent>
        </Card>

        <Card className="text-center hover-elevate" data-testid="feature-instant">
          <CardHeader>
            <div className="mx-auto w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-muted-foreground" />
            </div>
            <CardTitle className="text-lg">Instant Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Get categorized results in seconds, not hours of manual work
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Upload Component */}
      <FileUpload />

      {/* Supported Formats */}
      <Card data-testid="supported-formats">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Supported Formats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium">File Uploads</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm">PDF bank statements</span>
                  <Badge variant="secondary" className="text-xs">Recommended</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm">CSV transaction exports</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm">Excel (.xlsx) files</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm">Receipt images (PNG, JPG)</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Text Input</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm">SMS transaction alerts</span>
                  <Badge variant="secondary" className="text-xs">Popular</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm">Email receipts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm">Transaction descriptions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm">Payment confirmations</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card data-testid="next-steps">
        <CardHeader>
          <CardTitle>What happens next?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="mx-auto w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold">1</span>
              </div>
              <h4 className="font-medium">Upload & Process</h4>
              <p className="text-sm text-muted-foreground">
                AI analyzes your transactions and assigns categories
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="mx-auto w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                <span className="text-accent font-semibold">2</span>
              </div>
              <h4 className="font-medium">Review & Adjust</h4>
              <p className="text-sm text-muted-foreground">
                Verify categories and make adjustments if needed
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="mx-auto w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                <span className="text-muted-foreground font-semibold">3</span>
              </div>
              <h4 className="font-medium">Track & Budget</h4>
              <p className="text-sm text-muted-foreground">
                View insights and set budgets based on your spending
              </p>
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            <Link href="/analysis">
              <Button data-testid="button-view-analysis">
                View Analysis
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}