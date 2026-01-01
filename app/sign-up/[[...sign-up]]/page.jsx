import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-white px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
        <SignUp
          appearance={{
            elements: { formButtonPrimary: "bg-primary hover:bg-secondary" },
          }}
        />
      </div>
    </section>
  );
}
