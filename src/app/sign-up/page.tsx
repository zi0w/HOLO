"use client";

import SignUpForm from "@/app/sign-up/_components/Signup";
import splash_logo from "@/assets/images/splash/splash_logo.png";
import Image from "next/image";

const page = () => {
  return (
    <div>
      <Image src={splash_logo} alt="로고" width={343} height={165} />
      <SignUpForm />
    </div>
  );
};

export default page;
