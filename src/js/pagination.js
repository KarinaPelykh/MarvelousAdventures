// // pagination
// import Pagination from "tui-pagination";
// import "tui-pagination/dist/tui-pagination.css";
// import { handelGetAllComics } from "./Api";
// import { handelRenderComics } from "./all-comics";
// const paginationContainer = document.querySelector(".tui-pagination");
// export const handelPagination = (limit, data, currentPage) => {
//   const { total } = data.data;

//   let pagination = new Pagination(paginationContainer, {
//     totalItems: total,
//     itemsPerPage: limit,
//     visiblePages: 5,
//   });

//   pagination.on("afterMove", function (eventData) {
//     currentPage = eventData.page;

//     const start = (currentPage - 1) * limit;

//     //initialization
//     handelGetAllComics(limit, start)
//       .then((data) => {
//         handelRenderComics(data, start, start + limit);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     //   .finally(() => {
//     //     setTimeout(() => {
//     //       loader.classList.add("invisible");
//     //       body.style.overflow = "auto";
//     //     }, 1500);
//     //   });
//   });
// };
