import { MainLayout } from "@/components/layout/MainLayout";

export default function ProviderPortal() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">Provider Portal Dashboard</h1>
        <p className="text-lg text-slate-600">
          Your provider portal content goes here
        </p>
      </div>
    </MainLayout>
  );
}
