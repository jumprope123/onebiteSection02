import SeachableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import BookItem from "@/components/book-item";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-book";
import Head from "next/head";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const q = context.query.q;

  const books = await fetchBooks(q as string);

  return {
    props: { books },
  };
};

export default function Search({
  books,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>한입북스-검색결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스" />
        <meta
          property="og:description"
          content="한입북스에 등록된 도서들을 만나보세요"
        />
      </Head>
      <div>
        {books.map((item) => (
          <BookItem key={item.id} {...item} />
        ))}
      </div>
    </>
  );
}

Search.getLayout = (page: ReactNode) => {
  return <SeachableLayout>{page}</SeachableLayout>;
};
