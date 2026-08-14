const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function sendMessageStream(
  message: string,
  onChunk: (chunk: string) => void
) {
  const response = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error("Failed to get response");
  }

  const reader = response.body?.getReader();

  if (!reader) {
    throw new Error("No response body");
  }

  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();

    if (done) break;

    onChunk(decoder.decode(value));
  }
}