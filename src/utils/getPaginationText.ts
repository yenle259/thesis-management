export function getPaginationText(
  totalItemsCount: number,
  numberOfItemsPerPage: number,
  page: number
) {
  const start = (page - 1) * numberOfItemsPerPage + 1;
  const end = Math.min(start + numberOfItemsPerPage - 1, totalItemsCount);

  return `từ ${start} đến ${end} trong ${totalItemsCount} mục`;
}
