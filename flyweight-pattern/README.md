# **_Flyweight Pattern_**

> Reuse existing instances when working with identical objects

The flyweight pattern is a useful way to conserve memory when we're creating
a large number of similar objects.

In our application, we want users to be able to add books. All books have
a title, an author, and an isbn number! However, a library usually doesn't have
just one copy of a book: it usually has multiple copies of the same book.

It wouldn't be very useful to create a new book instance each time if there are
multiple copies of the exact same book. Instead, we want to create multiple
instances of the `Book` constructor, that represent a single book.

```ts
class Book {
  title: string;
  author: string;
  isbn: string;

  constructor(title: string, author: string, isbn: string) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
```

Let's create the functionality to add new books to the list. If a book has the
same ISBN number, thus is the exact same book type, we don't want to create an entirely new `Book` instance. Instead, we should first check whether this
book already exists.

```ts
const books = new Map();

const createBook = (title: string, author: string, isbn: string) => {
  const existingBook = books.has(isbn);

  if (existingBook) {
    return books.get(isbn);
  }
};
```

If it doesn't contain the book's ISBN number yet, we'll create a new book and
add its ISBN number to the isbnNumbers set.

```ts
const createBook = (title: string, author: string, isbn: string) => {
  const existingBook = books.has(isbn);

  if (existingBook) {
    return books.get(isbn);
  }

  const book = new Book(title, author, isbn);
  books.set(isbn, book);

  return book;
};
```

The `createBook` function helps us create new instances of one type of book.
However, a library usually contains multiple copies of the same book! Let's
create an `addBook` function, which allows us to add multiple copies of the
same book. It should invoke the `createBook` function, which returns either a
newly created `Book` instance, or returns the already existing instance.

In order to keep track of the total amount of copies, let's create
a bookList array that contains the total amount of books in the library.

```ts
const bookList: any[] = [];

const addBook = (
  title: string,
  author: string,
  isbn: string,
  availability: boolean,
  sales: number
) => {
  const book = {
    ...createBook(title, author, isbn),
    sales,
    availability,
    isbn,
  };

  bookList.push(book);
  return book;
};
```

Perfect! Instead of creating a new `Book` instance each time we add a copy,
we can effectively use the already existing `Book` instance for that particular
copy. Let's create 5 copies of 3 books: Harry Potter, To Kill a Mockingbird, and
The Great Gatsby.

```ts
addBook("Harry Potter", "JK Rowling", "AB123", false, 100);
addBook("Harry Potter", "JK Rowling", "AB123", false, 50);
addBook("To Kill a Mockingbird", "Harper Lee", "CD345", true, 10);
addBook("To Kill a Mockingbird", "Harper Lee", "CD345", false, 20);
addBook("The Great Gatsby", "F. Scott Fitzgerald", "EF567", false, 20);
```

Although there are 5 copies, we only have 3 Book instances!

```ts
class Book {
  title: string;
  author: string;
  isbn: string;

  constructor(title: string, author: string, isbn: string) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

const books = new Map();

const createBook = (title: string, author: string, isbn: string) => {
  const existingBook = books.has(isbn);

  if (existingBook) {
    return books.get(isbn);
  }

  const book = new Book(title, author, isbn);
  books.set(isbn, book);

  return book;
};

const bookList: any[] = [];

const addBook = (
  title: string,
  author: string,
  isbn: string,
  availability: boolean,
  sales: number
) => {
  const book = {
    ...createBook(title, author, isbn),
    sales,
    availability,
    isbn,
  };

  bookList.push(book);
  return book;
};

addBook("Harry Potter", "JK Rowling", "AB123", false, 100);
addBook("Harry Potter", "JK Rowling", "AB123", false, 50);
addBook("To Kill a Mockingbird", "Harper Lee", "CD345", true, 10);
addBook("To Kill a Mockingbird", "Harper Lee", "CD345", false, 20);
addBook("The Great Gatsby", "F. Scott Fitzgerald", "EF567", false, 20);

console.log("Total amount of copies: ", bookList.length); // 5
console.log("Total amount of books: ", books.size); // 3
```

The flyweight pattern is useful when you're creating a huge
number of objects, which could potentially drain all available RAM. It allows us
to minimize the amount of consumed memory.

In JavaScript, we can easily solve this problem through prototypal inheritance.
Nowadays, hardware has GBs of RAM, which makes the flyweight pattern
less important.
