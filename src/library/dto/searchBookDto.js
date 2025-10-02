export function SearchBookDto(search) {
  return {
    search: search ? search.toLowerCase().trim() : undefined,
  };
}
