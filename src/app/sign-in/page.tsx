import Signin from "@/app/sign-in/_components/Signin";
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
        <Signin />
      </div>
    </div>
  );
};

export default page;
