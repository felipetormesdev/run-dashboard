import Card from "@/components/Card";

export default function DashboardPage() {
  return (
    <main className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Distância total" value="42 km" />
        <Card title="Tempo total" value="3h 15m" />
        <Card title="Ritmo médio" value="4:38 /km" />
        <Card title="Corridas registradas" value="5" />
      </div>
    </main>
  );
}
