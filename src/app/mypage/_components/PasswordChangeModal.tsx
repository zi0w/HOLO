"use client";

import { useState } from "react";

export default function PasswordChangeModal() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-30">
      <div className="absolute left-1/2 top-1/2 h-[356px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-[4px] bg-white">
        <div className="py-10 px-5">
          <h1 className="font-gmarket-bold text-[24px] leading-[32px] text-base-800 mb-8">
          비밀번호 수정
        </h1>

        <label
          htmlFor="password"
          className="w-full font-gmarket text-[14px] leading-[20px] text-base-800 block mt-1 block"
        >
          비밀번호
        </label>

        <input
          id="password"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-2 rounded-[4px] border border-[#999E98] py-4 px-[12px] font-gmarket text-sm placeholder:leading-[20px] placeholder:text-[#909090]"
        />


        <input
          id="confirm-password"
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="h-[56px] w-[280px] rounded-[4px] border border-[#999E98] px-[12px] placeholder:font-['Gmarket_Sans'] placeholder:text-[14px] placeholder:leading-[20px] placeholder:text-[#909090]"
        />
        </div>

        <div className="mt-14 flex w-full border-t border-base-300 h-12 font-gmarket">
          <button className="flex-1 text-center bg-white rounded-bl-md text-base-800">
            취소
          </button>

          <button className=" flex-1 rounded-br-[4px] bg-[#FF7600] font-gmarket text-[16px]  leading-[20px] text-white">
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
