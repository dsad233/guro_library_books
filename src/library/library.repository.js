import books from "../../db/guro_library.json" with { type: "json" };
export class LibraryRepository {
  findByBook = async (searchBookDto) => {
    const book = books['DATA'].filter((book) => {
      return book['title'].includes(searchBookDto.search);
    })


    return book;
  }

  find = async (pageNationDto) => {
    const result = books['DATA'].splice(((pageNationDto.page - 1) * pageNationDto.pages), pageNationDto.pages)
    return result;
  };
}
