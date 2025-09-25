import { Children } from "react";

export const Button = ({ Children }: { Children: React.ReactNode }) => {
  return (
    <button className="bg-slate-900 text-white text-sm font-semibold py-2 px-4 rounded-2xl hover:bg-slate-800 hover:scale-105 transition duration-300">
      {Children}
    </button>
  );
};
