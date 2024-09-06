import axios from "axios";
import CryptoJS from "crypto-js";

const API_KEY_PRIVATE = "86167992f51495ba975666074c2de2488a64fb00";
const API_KEY_PUBLIC = "7f8ef27ce3f21548c1d09757433025a4";
const BASE_URL = "https://gateway.marvel.com:443";
const TS = "karina";
const HASH = CryptoJS.MD5(TS + API_KEY_PRIVATE + API_KEY_PUBLIC).toString();

const handelApiComics = ({ searchComics, valueSelect, selectByOrder }) => {
  return {
    titleStartsWith: searchComics,
    format: valueSelect,
    orderBy: selectByOrder,
    apikey: API_KEY_PUBLIC,
    hash: HASH,
    ts: TS,
  };
};

const handelFilterAllComics = async (searchQ) => {
  try {
    const url = handelApiComics(searchQ);
    const { data } = await axios.get(`${BASE_URL}/v1/public/comics?`, {
      params: url,
    });

    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export default handelFilterAllComics;
