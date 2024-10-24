import { useRouter } from "next/router";
import { KeyboardEvent, ReactNode, useEffect, useState } from "react";
import style from "./serachable-layout.module.css";
export default function SeachableLayout({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };
  const q = router.query.q as string;
  console.log(q);
  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  const onSubmit = () => {
    if (!search || q === search) {
      return;
    }
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div>
      <div className={style.serachbar_container}>
        <input
          placeholder="검색어를 입력하세요"
          value={search}
          onChange={onSearch}
          onKeyDown={onKeyDown}
        />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
}
