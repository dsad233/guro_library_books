export function FindBooksDto(search, branch, location) {
  return {
    search: search ? search.toLowerCase().trim() : undefined,
    branch: branch ? branch.toLowerCase().trim() : undefined,
    location: location ? location.trim() : undefined,
  };
}
