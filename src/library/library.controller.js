import axios from "axios";
import { asyncWrapper } from "../middlewares/asyncWrapper.js";
import { StatusCodes } from "http-status-codes";
import { PageNationDto } from "../common/pagenation/pagenationDto.js";
import { SearchBookDto } from "./dto/searchBookDto.js";
export class LibraryController {
  constructor(libraryService) {
    this.libraryService = libraryService;
  }
  get = async (req, res) => {
    try {
      const { page, perPage, search } = req.query;
      const responseArray = [];

      if (search) {
        for (let i = 1; i <= 500; i++) {
          const data = await axios
            .get(
              `https://api.odcloud.kr/api/15129157/v1/uddi:921d84d7-502b-4644-b21f-f1dd1071e8c1?page=${i}&perPage=10&returnType=JSON`,
              {
                headers: {
                  Authorization: `Infuser ${process.env.DATA_API_KEY}`,
                },
              }
            )
            .then((res) => res?.data)
            .catch((err) => console.error("요청 에러발생: ", err));

          responseArray.push(...data?.data);
        }

        const searchReg = new RegExp(
          search ? search.toLowerCase() : undefined,
          "i"
        );
        const result = responseArray.filter((data) => {
          return searchReg.test(data?.서명 || "");
        });

        return res.status(200).json({ message: result });
      } else {
        const data = await axios
          .get(
            `https://api.odcloud.kr/api/15129157/v1/uddi:921d84d7-502b-4644-b21f-f1dd1071e8c1?page=${
              page ?? 1
            }&perPage=${perPage ?? 10}&returnType=JSON`,
            {
              headers: {
                Authorization: `Infuser ${process.env.DATA_API_KEY}`,
              },
            }
          )
          .then((res) => res?.data)
          .catch((err) => console.error("요청 에러발생: ", err));

        responseArray.push(...data?.data);

        return res.status(200).json({
          message: responseArray,
          pages: {
            page: page,
            perPage: perPage,
          },
        });
      }

      //   const data2 = await axios
      //     .get(
      //       `https://api.odcloud.kr/api/15129154/v1/uddi:4ea61ff1-d44d-4b25-a435-d951cb759a8f?page=${
      //         page ? page : 1
      //       }&perPage=${perPage ? perPage : 10}&returnType=JSON`,
      //       {
      //         headers: {
      //           Authorization:
      //             "Infuser zxE5uMjAy0FNCcgeXA7WlKk0gpGxQym5cFu8ZN00pidqI+HSsYP8Oy0zkMouRi68xpoC0OCxlENtoDLi6lDInQ==",
      //         },
      //       }
      //     )
      //     .then((res) => res.data)
      //     .catch((err) => console.error("요청 에러발생: ", err));
    } catch (err) {
      console.error(err);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ err: err.message });
    }
  };

  getBooks = asyncWrapper(async (req, res) => {
    const { page, pages } = req.query;

    const pagenation = PageNationDto(page, pages);

    const books = await this.libraryService.getBooks(pagenation);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "도서 현황 조회 성공",
      data: books,
    });
  });

  findBook = asyncWrapper(async (req, res) => {
    const { search } = req.query;

    const searchBookDto = SearchBookDto(search);

    const book = await this.libraryService.findBook(searchBookDto);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "도서 검색 성공",
      data: book,
    });
  });
}
