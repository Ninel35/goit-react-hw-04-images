import { api } from "./api";

export const getAllImages = async (queryTerm, page) => {
    const { data } = await api(`?key=40348092-da5e0a767129707faba1470d8&q=${queryTerm}&page=${page}&per_page=12`)
    return data
}