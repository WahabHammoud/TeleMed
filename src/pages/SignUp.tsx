
import { Layout } from "@/components/layout/Layout";
import { SignUpForm } from "@/components/auth/SignUpForm";

export default function SignUp() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
        <SignUpForm />
      </div>
    </Layout>
  );
}
