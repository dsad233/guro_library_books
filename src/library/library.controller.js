import { asyncWrapper } from "../common/middlewares/asyncWrapper.js";
import { StatusCodes } from "http-status-codes";
import { PageNationDto } from "../common/pagenation/pagenationDto.js";
import { FindBooksDto } from "./dto/findBooksDto.js";
export class LibraryController {
  constructor(libraryService) {
    this.libraryService = libraryService;
  }

  // 서울 구로구 도서 현황 조회
  getBooks = asyncWrapper(async (req, res) => {
    const { page, pages, search, branch } = req.query;

    const pagenation = PageNationDto(page, pages);
    const findBooksDto = FindBooksDto(search, branch);

    const books = await this.libraryService.getBooks(pagenation, findBooksDto);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "도서 현황 조회 성공",
      data: books,
    });
  });
}
