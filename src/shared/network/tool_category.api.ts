import axios from "../../config/axios";
import { Tool } from "../types";

const ENDPOINT = "/tool-category"

export const saveTool = (param: Tool)=> 
  axios.post(`${ENDPOINT}/save`, param);

export const getToolById = (id: number)=> 
  axios.get(`${ENDPOINT}/get-by-id?id=${id}`);

export const getToolsPageable = (page: number, size: number, search: string = "")=> 
  axios.get(`${ENDPOINT}/pageable?page=${page}&size=${size}&search=${search}`);

export const getToolList = (search: string="")=> 
  axios.get(`${ENDPOINT}/list?search=${search}`);