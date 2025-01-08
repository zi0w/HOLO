import SignUpForm from "@/app/sign-up/_components/Signup";

const page = () => {
  return (
    <div className="bg-white-800 flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-3xl text-black">HoLo</h1>
        <SignUpForm />
      </div>
    </div>
  );
};

export default page;
