import OpenAI from "openai";

const RecommendPage = () => {
  // const openai = new OpenAI({
  //   apiKey: process.env.OPEN_AI_API_KEY,
  // });

  //   const completion = openai.chat.completions.create({
  //     model: "gpt-4o-mini",
  //     store: true,
  //     messages: [{ role: "user", content: "오늘 먹을 메뉴 추천해줘" }],
  //   });

  //   completion.then((result) => console.log(result.choices[0].message));

  return (
    <div className="m-8 flex flex-col items-center">
      <div className="flex flex-col text-center gap-4">
        <h1 className="text-3xl">오늘 뭐하지?</h1>
        <div className="flex flex-col text-sm">
          <span>오늘의 다양한 컨텐츠를 추천해드립니다.</span>
          <span>모든 답변은 OpenAI API 기반으로 생성됩니다.</span>
        </div>
      </div>
      <div className="flex flex-col gap-10 mt-10">
        <button className="border p-2">오늘의 메뉴 추천</button>
        <button className="border p-2">오늘의 운서</button>
        <button className="border p-2">오늘의 할일 추천</button>
      </div>
    </div>
  );
};

export default RecommendPage;
