type DashboardLayoutProps = {
    children: React.ReactNode;
  };
  
  export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
      <div className="space-y-6">
        <section>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-600">
            Aqui estão os seus principais indicadores de corrida.
          </p>
        </section>
  
        <section>{children}</section>
      </div>
    );
  }
  