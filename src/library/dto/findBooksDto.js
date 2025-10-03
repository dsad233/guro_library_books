export function FindBooksDto(search, branch) {
  return {
    search: search ? search.toLowerCase().trim() : undefined,
    branch: branch ? branch.toLowerCase().trim() : undefined,
  };
}
