
import { Layout } from "@/components/layout/Layout";

export function LoadingState() {
  return (
    <Layout>
      <div className="flex items-center justify-center h-[70vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    </Layout>
  );
}
