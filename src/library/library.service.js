export class LibraryService {
  constructor(libraryRepository) {
    this.libraryRepository = libraryRepository;
  }

  // 서울 구로구 도서 현황 조회
  getBooks = async (pageNationDto, findBooksDto) => {
    const books = await this.libraryRepository.find(
      pageNationDto,
      findBooksDto
    );
    return books;
  };
}
