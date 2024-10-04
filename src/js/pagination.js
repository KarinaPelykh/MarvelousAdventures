import Pagination from "tui-pagination";
import "tui-pagination/dist/tui-pagination.css";

import { handelFilterAllComics, handelGetAllComics } from "./Api";
import { handelRenderComics } from "./all-comics";
import { handelHideLoader } from "./loader";

const paginationContainer = document.querySelector(".tui-pagination");

export const handelPagination = (limit, data, currentPage, params) => {
  const { total } = data.data;

  let pagination = new Pagination(paginationContainer, {
    totalItems: total,
    itemsPerPage: limit,
    visiblePages: 4,
  });

  pagination.on("afterMove", function (eventData) {
    currentPage = eventData.page;

    const handelProcessedDate = (callback, params, limit, start) => {
      callback(params, limit, start)
        .then((data) => {
          handelRenderComics(data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          handelHideLoader();
        });
    };

    const start = (currentPage - 1) * limit;
    if (params?.searchComics) {
      handelProcessedDate(handelFilterAllComics, params, limit, start);
    } else {
      handelProcessedDate(handelGetAllComics, limit, start);
    }
  });
};
