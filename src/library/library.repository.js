import books from "../../db/guro_library.json" with { type: "json" };
export class LibraryRepository {
  find = async (pageNationDto, findBooksDto) => {
    if(findBooksDto.search || findBooksDto.branch){
      const result = books['DATA'].filter((data) => {
        if(findBooksDto.search && findBooksDto.branch){
          return new RegExp(findBooksDto.search, 'i').test(data.title) && data.brch_name.match(findBooksDto.branch)
        } else if(findBooksDto.search){
          return new RegExp(findBooksDto.search, 'i').test(data.title)
        } else {
          return data.brch_name.match(findBooksDto.branch)
        }
      });

      const splice = result.splice(((pageNationDto.page - 1) * pageNationDto.pages), pageNationDto.pages);
      return {
        data: splice,
        pagenation: {
          page: pageNationDto.page,
          pages: pageNationDto.pages,
          totalPage: Math.ceil(result.length / pageNationDto.pages) + 1,
        }
      };
    } else {
      const result = books['DATA'].map((data) => data).splice(((pageNationDto.page - 1) * pageNationDto.pages), pageNationDto.pages)

      return {
        data: result,
        pagenation: {
          page: pageNationDto.page,
          pages: pageNationDto.pages,
          totalPage: Math.ceil(books['DATA'].length / pageNationDto.pages),
        }
      }
    }
  };
}
