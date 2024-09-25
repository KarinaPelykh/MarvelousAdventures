import axios from "axios";
import CryptoJS from "crypto-js";
const comics = "request_user";
const API_KEY_PRIVATE = "86167992f51495ba975666074c2de2488a64fb00";
const API_KEY_PUBLIC = "7f8ef27ce3f21548c1d09757433025a4";
const BASE_URL = "https://gateway.marvel.com:443";
const TS = "karina";
const HASH = CryptoJS.MD5(TS + API_KEY_PRIVATE + API_KEY_PUBLIC).toString();

// Authorization
export const fetchAuthorization = async (limit = 6) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/v1/public/comics?apikey=${API_KEY_PUBLIC}&hash=${HASH}&ts=${TS}&limit=${limit}&dateDescriptor=lastWeek`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

fetchAuthorization();

/// url the first for all comics the second for search user
export const handelApiComics = (limit = 5, offset) => {
  const searchRequestUser = localStorage.getItem(comics);
  if (searchRequestUser) {
    const parsedUserRequest = JSON.parse(searchRequestUser);
    const madeArray = parsedUserRequest.split("");
    const changedTitle = madeArray
      .splice(0, parsedUserRequest.indexOf("("))
      .join("");
    if (changedTitle) {
      return `${BASE_URL}/v1/public/comics?title=${changedTitle}&apikey=${API_KEY_PUBLIC}&hash=${HASH}&ts=${TS}&limit=${limit}&offset=${offset}`;
    }
  } else {
    return `${BASE_URL}/v1/public/comics?apikey=${API_KEY_PUBLIC}&hash=${HASH}&ts=${TS}&limit=${limit}&offset=${offset}`;
  }
};
// request
export const handelGetAllComics = async (limit, offset) => {
  try {
    const url = handelApiComics(limit, offset);
    const { data } = await axios.get(url);
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
};

////function for get data  for modal window

export const getInformationAboutComics = async (comicId) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/v1/public/comics/${comicId}?apikey=${API_KEY_PUBLIC}&hash=${HASH}&ts=${TS}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

// filter
const handelApiFilterComics = (
  { searchComics, valueSelect, selectByOrder, formatDate },
  limit,
  offset
) => {
  console.log(searchComics, valueSelect, selectByOrder, formatDate, limit);

  return {
    titleStartsWith: searchComics,
    format: valueSelect,
    orderBy: selectByOrder,
    startYear: formatDate,
    apikey: API_KEY_PUBLIC,
    hash: HASH,
    limit: limit,
    offset: offset,
    ts: TS,
  };
};

export const handelFilterAllComics = async (searchQ, limit, start) => {
  console.log(start);

  try {
    const url = handelApiFilterComics(searchQ, limit, start);
    const { data } = await axios.get(`${BASE_URL}/v1/public/comics?`, {
      params: url,
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

/// header form search
export const handelGetComics = async (title) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/v1/public/comics?titleStartsWith=${title}&apikey=${API_KEY_PUBLIC}&hash=${HASH}&ts=${TS}&limit=4`
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};
///
