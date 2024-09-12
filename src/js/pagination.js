// //pagination
// const pagination = document.querySelector(".pagination-comics");

// export const handelPagination = (limit, dataInfo, start) => {
// const { total } = dataInfo.data;
// console.log(limit, dataInfo);

// const paginationCount = Math.ceil(total / limit);
//   console.log(paginationCount);

//   const listButPagination = document.createElement("ul");
//   listButPagination.classList.add("list-item-button");
//   for (let i = 0; i < paginationCount; i++) {
//     const itemButton = handelButtonOnPagination(i + 1, start);

//     listButPagination.appendChild(itemButton);
//   }
//   pagination.innerText = "";
//   pagination.appendChild(listButPagination);
// };

// export const handelButtonOnPagination = (page, start) => {
//   const itemButton = document.createElement("li");

//   itemButton.innerText = page;

//   itemButton.addEventListener("click", () => {
//     start = page;
//     handelPagination();
//   });

//   return itemButton;
// };
