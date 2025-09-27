import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  FileText, 
  Image,
  CheckCircle, 
  AlertCircle,
  Loader2,
  X,
  Plus
} from "lucide-react";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: "processing" | "completed" | "error";
  transactionCount?: number;
}

export default function FileUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [textInput, setTextInput] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      handleFiles(selectedFiles);
    }
  };

  const handleFiles = (fileList: File[]) => {
    console.log("Processing files:", fileList.map(f => f.name));
    
    const newFiles: UploadedFile[] = fileList.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      status: "processing" as const,
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate processing
    newFiles.forEach(file => {
      setTimeout(() => {
        setFiles(prev => prev.map(f => 
          f.id === file.id 
            ? { ...f, status: "completed" as const, transactionCount: Math.floor(Math.random() * 50) + 5 }
            : f
        ));
      }, Math.random() * 3000 + 1000);
    });
  };

  const handleTextProcess = () => {
    if (!textInput.trim()) return;
    
    setProcessing(true);
    console.log("Processing text input:", textInput);
    
    // Simulate processing
    setTimeout(() => {
      setProcessing(false);
      const newFile: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: "SMS/Email Content",
        size: textInput.length,
        type: "text/plain",
        status: "completed",
        transactionCount: Math.floor(Math.random() * 20) + 2,
      };
      setFiles(prev => [...prev, newFile]);
      setTextInput("");
    }, 2000);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
    console.log("Removed file:", id);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.includes('image')) return <Image className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing": return <Loader2 className="h-4 w-4 animate-spin" />;
      case "completed": return <CheckCircle className="h-4 w-4 text-primary" />;
      case "error": return <AlertCircle className="h-4 w-4 text-destructive" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6" data-testid="file-upload">
      <Tabs defaultValue="files" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="files" data-testid="tab-files">Upload Files</TabsTrigger>
          <TabsTrigger value="text" data-testid="tab-text">Paste Text</TabsTrigger>
        </TabsList>
        
        <TabsContent value="files" className="space-y-4">
          {/* File Drop Zone */}
          <Card 
            className={`transition-colors hover-elevate ${
              dragActive ? 'border-primary bg-primary/5' : 'border-dashed'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            data-testid="file-dropzone"
          >
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <div className="mx-auto w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                  <Upload className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Upload Bank Statements</h3>
                  <p className="text-sm text-muted-foreground">
                    Drag and drop your bank statements or SMS screenshots
                  </p>
                </div>
                <div className="space-y-2">
                  <Button 
                    onClick={() => document.getElementById('file-input')?.click()}
                    data-testid="button-select-files"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Select Files
                  </Button>
                  <input
                    id="file-input"
                    type="file"
                    multiple
                    accept=".pdf,.csv,.xlsx,.png,.jpg,.jpeg"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <p className="text-xs text-muted-foreground">
                    Supports PDF, CSV, Excel, and image files
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="text" className="space-y-4">
          {/* Text Input */}
          <Card data-testid="text-input-card">
            <CardHeader>
              <CardTitle>Paste SMS or Email Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Paste your SMS messages or email receipts here..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                className="min-h-32"
                data-testid="textarea-transaction-text"
              />
              <Button 
                onClick={handleTextProcess}
                disabled={!textInput.trim() || processing}
                data-testid="button-process-text"
              >
                {processing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4 mr-2" />
                    Process Text
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Uploaded Files List */}
      {files.length > 0 && (
        <Card data-testid="uploaded-files">
          <CardHeader>
            <CardTitle>Processed Files</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {files.map((file) => (
                <div 
                  key={file.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card"
                  data-testid={`file-item-${file.id}`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="p-2 bg-muted rounded">
                      {getFileIcon(file.type)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium truncate" data-testid={`text-filename-${file.id}`}>
                        {file.name}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{formatFileSize(file.size)}</span>
                        {file.transactionCount && (
                          <>
                            <span>•</span>
                            <span data-testid={`text-transaction-count-${file.id}`}>
                              {file.transactionCount} transactions found
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        file.status === "completed" ? "default" :
                        file.status === "error" ? "destructive" : "secondary"
                      }
                      data-testid={`badge-status-${file.id}`}
                    >
                      {getStatusIcon(file.status)}
                      <span className="ml-1 capitalize">{file.status}</span>
                    </Badge>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(file.id)}
                      data-testid={`button-remove-${file.id}`}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}