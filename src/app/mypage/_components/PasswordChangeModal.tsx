"use client";

import { useState } from 'react';

export default function PasswordChangeModal() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className="relative w-[320px] h-[356px] bg-white rounded-[4px]">
      
      <h1 className="absolute top-[42px] left-[20px] text-[#424242] font-['Gmarket_Sans'] text-[24px] font-medium leading-[32px]">
        비밀번호 수정
      </h1>

     
      <label 
        htmlFor="password" 
        className="absolute top-[106px] left-[24px] text-[#424242] font-['Gmarket_Sans'] text-[14px] font-normal leading-[20px]"
      >
        비밀번호
      </label>

     
      <input 
        id="password"
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="absolute top-[130px] left-[20px] w-[280px] h-[56px] rounded-[4px] border border-[#999E98] px-[12px] placeholder:text-[#909090] placeholder:font-['Gmarket_Sans'] placeholder:text-[14px] placeholder:leading-[20px]"
      />

     
      <label 
        htmlFor="confirm-password" 
        className="absolute top-[196px] left-[24px] text-[#424242] font-['Gmarket_Sans'] text-[14px] font-normal leading-[20px]"
      >
        비밀번호 확인
      </label>

     
      <input 
        id="confirm-password"
        type="password"
        placeholder="비밀번호 확인"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="absolute top-[220px] left-[20px] w-[280px] h-[56px] rounded-[4px] border border-[#999E98] px-[12px] placeholder:text-[#909090] placeholder:font-['Gmarket_Sans'] placeholder:text-[14px] placeholder:leading-[20px]"
      />

    
      <div className="absolute bottom-0 left-0 w-full flex">
       
        <button 
          className="w-[160px] h-[48px] flex justify-center items-center bg-[#F5F5F5] rounded-bl-[4px] text-[#424242] font-['Gmarket_Sans'] text-[16px] font-normal leading-[20px]"
        >
          취소
        </button>

       
        <button 
          className="w-[160px] h-[48px] flex justify-center items-center bg-[#FF7600] rounded-br-[4px] text-white font-['Gmarket_Sans'] text-[16px] font-normal leading-[20px]"
        >
          저장
        </button>
      </div>
    </div>
  );
}
