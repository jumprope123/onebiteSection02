import SeachableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import BookItem from "@/components/book-item";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-book";

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
    <div>
      {books.map((item) => (
        <BookItem key={item.id} {...item} />
      ))}
    </div>
  );
}

Search.getLayout = (page: ReactNode) => {
  return <SeachableLayout>{page}</SeachableLayout>;
};
