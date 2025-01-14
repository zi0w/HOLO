export const shortenUrl = async (longUrl: string): Promise<string | null> => {
  const API_TOKEN = process.env.TINY_URL_API_TOKEN || "";
  const API_ENDPOINT = "https://api.tinyurl.com/create";

  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: longUrl,
        domain: "tinyurl.com",
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const shortenUrlData = await response.json();
    return shortenUrlData.data.tiny_url;
  } catch (error) {
    console.error("URL 단축 실패:", error);
    return null;
  }
};
