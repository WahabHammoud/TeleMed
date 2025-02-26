
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FileText, Upload, Trash2 } from "lucide-react";

export default function DocumentsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: documents, isLoading } = useQuery({
    queryKey: ["medical-documents"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("medical_documents")
        .select("*")
        .eq("patient_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (!file || !title) throw new Error("Please provide both title and file");

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Upload file to storage
      const fileExt = file.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("medical-documents")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Create document record
      const { error: dbError } = await supabase.from("medical_documents").insert({
        patient_id: user.id,
        title,
        file_path: filePath,
        file_type: file.type,
      });

      if (dbError) throw dbError;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Document uploaded successfully",
      });
      setFile(null);
      setTitle("");
      queryClient.invalidateQueries({ queryKey: ["medical-documents"] });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (documentId: string) => {
      const document = documents?.find(d => d.id === documentId);
      if (!document) throw new Error("Document not found");

      // Delete file from storage
      const { error: storageError } = await supabase.storage
        .from("medical-documents")
        .remove([document.file_path]);

      if (storageError) throw storageError;

      // Delete document record
      const { error: dbError } = await supabase
        .from("medical_documents")
        .delete()
        .eq("id", documentId);

      if (dbError) throw dbError;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Document deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["medical-documents"] });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upload Medical Document</CardTitle>
            <CardDescription>
              Upload your medical documents securely
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                placeholder="Document Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <Button
                onClick={() => uploadMutation.mutate()}
                disabled={!file || !title || uploadMutation.isPending}
                className="w-full"
              >
                <Upload className="mr-2 h-4 w-4" />
                {uploadMutation.isPending ? "Uploading..." : "Upload Document"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Documents</CardTitle>
            <CardDescription>
              View and manage your medical documents
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Loading documents...</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {documents?.map((doc) => (
                  <Card key={doc.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-8 w-8 text-blue-500" />
                          <div>
                            <h3 className="font-semibold">{doc.title}</h3>
                            <p className="text-sm text-gray-500">
                              {new Date(doc.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => deleteMutation.mutate(doc.id)}
                          disabled={deleteMutation.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {documents?.length === 0 && (
                  <p className="text-gray-500">No documents found</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
