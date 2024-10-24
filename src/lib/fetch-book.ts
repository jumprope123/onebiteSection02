import { BookData } from "@/types/types";

export default async function fetchBooks(q?: string): Promise<BookData[]> {
  let url = "";
  if (!q) {
    url = `http://localhost:12345/book`;
  } else {
    url = `http://localhost:12345/book/search?q=${q}`;
  }

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
