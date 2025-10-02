export class LibraryService {
  constructor(libraryRepository) {
    this.libraryRepository = libraryRepository;
  }

  getBooks = async (pageNationDto) => {
    const books = await this.libraryRepository.find(pageNationDto);
    return {
      data: books,
      pagenation: {
        page: pageNationDto.page,
        pageges: pageNationDto.pages,
      },
    };
  };

  findBook = async (searchBookDto) => {
    const book = await this.libraryRepository.findByBook(searchBookDto);
    return {
      data: book,
    };
  };
}
