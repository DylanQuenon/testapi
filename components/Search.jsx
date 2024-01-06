"use client";
import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { getBooks } from "@/lib/book";

import Link from "next/link";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const fetchBooks = async () => {
    const data = await getBooks();
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks()


  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher des livres"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.search}
      />

      <ul>
        {filteredBooks.map((book) => (
          <li key={book.id}>
            <Link href={`/books/${book.id}`}>{book.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
