import clsx from "clsx";
import type { ReactNode } from "react";

type LayoutProps = {
  question: string;
  onPrev?: () => void;
  children: ReactNode;
  handleClick?: () => void;
  selectedAnswer?: string;
};

const Layout = ({ question, onPrev, children, handleClick, selectedAnswer }: LayoutProps) => {
  const isDisabled = !selectedAnswer; // 선택된 답변이 없으면 버튼 비활성화

  return (
    <div className="flex h-full flex-col items-center">
      <header>
        <h1 className="mt-10 text-2xl text-base-800">{question}</h1>
      </header>
      {children}

      {/* 버튼 컨테이너 */}
      <div className="mb-32 mt-10 flex gap-2 w-full max-w-md lg:mb-10">
        <button
          type="button"
          onClick={onPrev}
          className="h-12 flex-1 w-full rounded border border-primary-500 font-gmarket text-primary-500"
        >
          이전
        </button>

        <button
          type="button"
          onClick={handleClick}
          className={clsx(
            "h-12 flex-1 rounded font-gmarket w-full",
            isDisabled
              ? "bg-base-400 text-white cursor-not-allowed"
              : "bg-primary-500 text-white"
          )}
          disabled={isDisabled}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default Layout;
