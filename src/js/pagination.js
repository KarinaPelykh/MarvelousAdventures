//pagination
const pagination = document.querySelector(".pagination");

export const handelPagination = (limit, dataInfo) => {
  const { results } = dataInfo.data;
  console.log(limit, results);

  const paginationCount = Math.ceil(results.length / limit);
  console.log(paginationCount);

  const listButPagination = document.createElement("ul");
  for (let i = 0; i < paginationCount; i++) {
    const itemButton = handelButtonOnPagination(i + 1);
    console.log(itemButton);

    listButPagination.appendChild(itemButton);
  }
  pagination.appendChild(listButPagination);
};

export const handelButtonOnPagination = (page) => {
  const itemButton = document.createElement("li");
  itemButton.innerText = page;

  itemButton.addEventListener("click", () => {
    // currentPage = page;
    handelPagination();
  });

  return itemButton;
};
