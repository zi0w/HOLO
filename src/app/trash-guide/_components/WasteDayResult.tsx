import type { WasteDayAnswerData } from "@/app/trash-guide/_types/trashTypes";
import Loading from "@/components/common/Loading";

type WasteDayResultProps = {
  loading: boolean;
  error: string | null;
  wasteDayAnswer: WasteDayAnswerData;
};

const WasteDayResult = ({
  loading,
  error,
  wasteDayAnswer,
}: WasteDayResultProps) => {
  if (loading) return <Loading />;
  if (error) return <p className="mt-5 text-red-500">{error}</p>;
  if (!wasteDayAnswer) return null;
  if (wasteDayAnswer.length === 0) {
    return (
      <p className="pt-10 text-center text-base-800">다시 시도해주세요!</p>
    );
  }

  return (
    <ul className="mt-5 grid gap-5">
      {wasteDayAnswer.map((answer, i) => (
        <li key={i}>
          {Object.entries(answer).map(([waste, day]) => (
            <div key={waste} className="text-base-800">
              <strong>{waste}</strong>
              <p className="mt-1">{day}</p>
            </div>
          ))}
        </li>
      ))}
    </ul>
  );
};

export default WasteDayResult;
