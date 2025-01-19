import Link from "next/link";
import type { ReactNode } from "react";

type LayoutProps = {
    question: string;
    onPrev?: () => void;
    children: ReactNode;
    handleClick?: () => void;
}

const Layout = ({ question, onPrev, children, handleClick }: LayoutProps) => {
  return (
    <div className="h-full flex flex-col items-center">
      <header>
        <h1 className="text-2xl mt-10 text-base-800">{question}</h1>
      </header>
      {children}
      <div className="mt-10 flex gap-4">
        {onPrev ? (
          <button type="button" onClick={onPrev} className="w-[177px] h-12 rounded border border-base-400 font-gmarket text-base-800">
            이전
          </button>
        ) : (
          // TODO: 이전으로 안가짐
          <Link href="/recommend">
            이전
          </Link>
        )}
        <button type="button" onClick={handleClick} className="w-[177px] h-12 rounded bg-primary-500 font-gmarket text-white">
          다음
        </button>
      </div>
    </div>
  );
};

export default Layout;
