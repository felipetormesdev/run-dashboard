"use client";

const runs = [
  { date: "01/09/2025", distance: "10 km", time: "50m", pace: "5:00 /km" },
  { date: "03/09/2025", distance: "5 km", time: "24m", pace: "4:48 /km" },
  { date: "05/09/2025", distance: "15 km", time: "1h 15m", pace: "5:00 /km" },
];

export default function RecentRunsTable() {
  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <h2 className="mb-4 text-lg font-semibold text-gray-700">
        Últimas Corridas
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Data</th>
              <th className="p-2">Distância</th>
              <th className="p-2">Tempo</th>
              <th className="p-2">Ritmo</th>
            </tr>
          </thead>
          <tbody>
            {runs.map((run, index) => (
              <tr key={index} className="border-t">
                <td className="p-2">{run.date}</td>
                <td className="p-2">{run.distance}</td>
                <td className="p-2">{run.time}</td>
                <td className="p-2">{run.pace}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
