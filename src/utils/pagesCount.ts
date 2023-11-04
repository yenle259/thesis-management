export function pagesCount(
  totalItemsCount: number,
  numberOfItemsPerPage: number
) {
  return (totalItemsCount - 1) / numberOfItemsPerPage + 1;
}
