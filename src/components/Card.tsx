type CardProps = {
    title: string;
    value: string;
  };
  
  export default function Card({ title, value }: CardProps) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-md">
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        <p className="mt-2 text-2xl font-bold text-green-600">{value}</p>
      </div>
    );
  }
  