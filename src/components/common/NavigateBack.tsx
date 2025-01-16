import ArrowLeftIcon from "@/assets/images/common/arrow-left-icon.svg";
import { useRouter } from "next/navigation";

const NavigateBack = () => {
  const router = useRouter();
  return (
    <div className="p-5">
      <button onClick={() => router.back()}>
        <ArrowLeftIcon />
      </button>
    </div>
  );
};

export default NavigateBack;
