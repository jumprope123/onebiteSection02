import { BookData } from "@/types/types";

export default async function fetchRandomBooks(): Promise<BookData[]> {
  const url = `http://localhost:12345/book/random`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.error("Error:", e);
    return [];
  }
}
