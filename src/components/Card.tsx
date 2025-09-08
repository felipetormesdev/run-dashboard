import { ReactNode } from "react";

interface CardProps {
  title: string;
  children: ReactNode;
}

export default function Card({ title, children }: CardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">{title}</h2>
      <div className="text-2xl font-bold text-green-600">{children}</div>
    </div>
  );
}
