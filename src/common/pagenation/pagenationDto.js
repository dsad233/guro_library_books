export function PagiNationDto(page, pages) {
  return {
    page: page ? Number(page.trim()) : 1,
    pages: pages ? Number(pages.trim()) : 10,
  };
}
