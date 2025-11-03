export class LibraryService {
  constructor(libraryRepository) {
    this.libraryRepository = libraryRepository;
  }

  // 서울 구로 도서관 도서 현황 조회
  getGuroBooks = async (pageNationDto, findBooksDto) => {
    return await this.libraryRepository.findByGuroBooks(
      pageNationDto,
      findBooksDto
    );
  };

  // 여주 도서관 도서 현황 조회
  getYeojuBooks = async (pageNationDto, findBooksDto) => {
    return await this.libraryRepository.findByYejouBooks(
      pageNationDto,
      findBooksDto
    );
  };
}
