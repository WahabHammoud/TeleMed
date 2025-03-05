
import { Layout } from "@/components/layout/Layout";
import { AdminCreator } from "@/components/auth/AdminCreator";

export default function AdminPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Administration Tools</h1>
        <AdminCreator />
      </div>
    </Layout>
  );
}
