interface Book {
    title: string;
    authors: string[];
    description: string;
    publisher: string;
    publishedDate: string;
    pageCount: number;
    categories?:string[];
    thumbnail: string;
    id: string;
    genre: string;
}

export default Book;