
import { Layout } from "@/components/layout/Layout";
import { SignInForm } from "@/components/auth/SignInForm";

export default function SignIn() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Sign In</h1>
        <SignInForm />
      </div>
    </Layout>
  );
}
