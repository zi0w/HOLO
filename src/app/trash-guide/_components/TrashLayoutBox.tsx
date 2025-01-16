import type { ReactNode } from "react";

type TrashLayoutBoxProps = {
  icon: ReactNode;
  title: ReactNode;
  children: ReactNode;
};

const TrashLayoutBox = ({ icon, title, children }: TrashLayoutBoxProps) => {
  return (
    <div className="shadow-custom p-5 relative mb-20 rounded-lg bg-white">
      <div className="absolute left-1/2 top-[-30px] -translate-x-1/2">
        {icon}
      </div>
      <h1 className="mb-6 pt-8 text-center font-gmarket text-2xl font-bold text-base-800">
        {title}
      </h1>
      {children}
    </div>
  );
};

export default TrashLayoutBox;
