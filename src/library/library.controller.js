import { StatusCodes } from "http-status-codes";
import { PagiNationDto } from "../common/pagenation/pagenationDto.js";
import { FindBooksDto } from "./dto/findBooksDto.js";
export class LibraryController {
  constructor(libraryService) {
    this.libraryService = libraryService;
  }

  // 서울 구로 도서관 도서 현황 조회
  getGuroBooks = async (req, res) => {
    const { page, pages, search, branch } = req.query;

    const pagenation = PagiNationDto(page, pages);
    const findBooksDto = FindBooksDto(search, branch);

    const books = await this.libraryService.getGuroBooks(
      pagenation,
      findBooksDto
    );

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "도서 현황 조회 성공",
      data: books,
    });
  };

  // 여주 도서관 도서 현황 조회
  getYeojuBooks = async (req, res) => {
    const { page, pages, search, branch, location } = req.query;

    const pagenation = PagiNationDto(page, pages);
    const findBooksDto = FindBooksDto(search, branch, location);

    const test = await this.libraryService.getYeojuBooks(
      pagenation,
      findBooksDto
    );

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "도서 현황 조회 성공",
      data: test,
    });
  };
}
