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
    <section className="w-full h-full flex flex-col items-center gap-10">
      <header>
        <h1 className="text-3xl">{question}</h1>
      </header>
      {children}
      <div className="flex gap-5">
        {onPrev ? (
          <button type="button" onClick={onPrev} className="border p-1">
            이전
          </button>
        ) : (
          <Link href="/recommend">
            <button type="button" className="border p-1">이전</button>
          </Link>
        )}
        <button type="button" onClick={handleClick} className="border p-1">
          다음으로
        </button>
      </div>
    </section>
  );
};

export default Layout;
