import SignUpForm from "@/app/sign-up/_components/Signup";
import logo from "@/assets/images/common/logo.png"
import Image from "next/image";

const page = () => {
  return (
    <div className="bg-white-800 flex min-h-screen items-center justify-center">
      <div className="text-center">
       <Image src={logo}
       alt="로고"
       width={343}
       height={165}/>
        <SignUpForm />
      </div>
    </div>
  );
};

export default page;
