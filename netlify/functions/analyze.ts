export async function handler(event) {
  try {
    const { images, crop, description } = JSON.parse(event.body);

    const SYSTEM_PROMPT = `أنت خبير زراعي متخصص في تشخيص أمراض النباتات.

قم بالرد بتنسيق JSON فقط:
{
  "diagnosis": "",
  "symptoms": [],
  "causes": [],
  "treatment": [],
  "prevention": [],
  "confidence": 80
}`;

    const parts = [
      {
        text: `${SYSTEM_PROMPT}\n\nنوع المحصول: ${crop}\n${description || ""}`,
      },
      ...images.map((img) => ({
        inline_data: {
          mime_type: "image/jpeg",
          data: img,
        },
      })),
    ];

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [{ parts }],
        }),
      }
    );

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "AI error" }),
    };
  }
}