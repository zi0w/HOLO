import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto p-5 pb-0 lg:max-w-[979px] lg:pt-12">
      <h1 className="common-title">청년 정책</h1>
      <div className="mb-10 mt-5 rounded-lg px-5 py-8 shadow-custom">
        {children}
      </div>
    </div>
  );
};

export default layout;
