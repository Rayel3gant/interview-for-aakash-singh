import React from "react";

export const LaunchModalText = ({
  label,
  text,
}: {
  label: string;
  text: string | number;
}) => {
  return (
    <div className="w-full flex items-center justify-between text-[10px]  md:text-[14px] text-[#4B5563] border-b-[0.25px] border-b-[#1F2937] pb-2">
      <div className="font-semibold">{label}</div>
      <div>{text}</div>
    </div>
  );
};
