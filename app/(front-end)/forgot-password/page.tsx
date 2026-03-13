import ForgotPasswordForm from "@/components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-6 py-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl dark:bg-gray-800 dark:border dark:border-gray-700">
        <div className="p-6 space-y-6 sm:p-8">
          <h1 className="text-xl font-bold tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
            Reset Password
          </h1>

          <ForgotPasswordForm />
        </div>
      </div>
    </section>
  );
}