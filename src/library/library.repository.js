import books from "../../db/guro_library.json" with { type: "json" };
import * as fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
export class LibraryRepository {
  // 서울 구로 도서관 도서 현황 조회
  findByGuroBooks = async (pageNationDto, findBooksDto) => {
    if (findBooksDto.search || findBooksDto.branch) {
      const result = books["DATA"].filter((data) => {
        if (findBooksDto.search && findBooksDto.branch) {
          return (
            new RegExp(findBooksDto.search, "i").test(data.title) &&
            data.brch_name.match(findBooksDto.branch)
          );
        } else if (findBooksDto.search) {
          return new RegExp(findBooksDto.search, "i").test(data.title);
        } else if (findBooksDto.branch) {
          return data.brch_name.match(findBooksDto.branch);
        }
      });

      const splice = result.splice(
        (pageNationDto.page - 1) * pageNationDto.pages,
        pageNationDto.pages
      );
      return {
        items: splice,
        pagenation: {
          page: pageNationDto.page,
          pages: pageNationDto.pages,
          totalPage: Math.ceil(result.length / pageNationDto.pages) + 1,
          total: result.length,
        },
      };
    } else {
      const result = books["DATA"]
        .map((data) => data)
        .splice(
          (pageNationDto.page - 1) * pageNationDto.pages,
          pageNationDto.pages
        );

      return {
        items: result,
        pagenation: {
          page: pageNationDto.page,
          pages: pageNationDto.pages,
          totalPage: Math.ceil(books["DATA"].length / pageNationDto.pages),
          total: books["DATA"].length,
        },
      };
    }
  };

  // 여주 도서관 도서 현황 조회
  findByYejouBooks = async (pageNationDto, findBooksDto) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const csvYejouLibrary = fs.readFileSync(
      path.join(__dirname, "../../db", "excel_yeoju_library.csv"),
      "utf8"
    );
    const csvSejongLibrary = fs.readFileSync(
      path.join(__dirname, "../../db", "excel_yejou_sejong_library.csv"),
      "utf8"
    );

    const yejouLibrarySplit = csvYejouLibrary.split("\r\n");
    const sejongLibrarySplit = csvSejongLibrary.split("\r\n");

    Promise.all([
      // 첫 행 삭제
      yejouLibrarySplit.shift(),
      sejongLibrarySplit.shift(),
    ]);

    // 배열 합치기
    const concatArray = yejouLibrarySplit.concat(sejongLibrarySplit);

    const result = [];
    for (const i of concatArray) {
      const row = i.split(",");
      result.push({
        location: row[0],
        reference_room: row[1],
        book_title: row[2],
        author: row[3],
        publisher: row[4],
        call_number: row[5],
        date_at: row[6],
      });
    }

    if (findBooksDto.search || findBooksDto.branch || findBooksDto.location) {
      const filter = result.filter((data) => {
        if (findBooksDto.search && findBooksDto.location) {
          return (
            new RegExp(findBooksDto.search, "i").test(data.book_title) &&
            data.location.match(findBooksDto.location)
          );
        } else if (findBooksDto.search) {
          return new RegExp(findBooksDto.search, "i").test(data.book_title);
        } else if (findBooksDto.location) {
          return data.location.match(findBooksDto.location);
        }
      });

      const splice = filter.splice(
        (pageNationDto.page - 1) * pageNationDto.pages,
        pageNationDto.pages
      );

      return {
        items: splice,
        pagenation: {
          page: pageNationDto.page,
          pages: pageNationDto.pages,
          totalPage: Math.ceil(filter.length / pageNationDto.pages) + 1,
          total: filter.length,
        },
      };
    } else {
      return {
        items: result.splice(
          (pageNationDto.page - 1) * pageNationDto.pages,
          pageNationDto.pages
        ),
        pagenation: {
          page: pageNationDto.page,
          pages: pageNationDto.pages,
          totalPage: Math.ceil(result.length / pageNationDto.pages) + 1,
          total: result.length,
        },
      };
    }
  };
}
