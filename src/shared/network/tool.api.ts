import axios from "../../config/axios";
import { GenericListResponse, GenericPageResponse, GenericResponse } from "../common";
import { Tool } from "../types";

const ENDPOINT = "/tool"

export const saveTool = (param: Tool)=> 
  axios.post(`${ENDPOINT}/save`, param);

export const getToolById = (id: number)=> 
  axios.get<GenericResponse<Tool>>(`${ENDPOINT}/get-by-id?id=${id}`);

export const getToolsPageable = (page: number, size: number, search: string = "")=> 
  axios.get<GenericPageResponse<Tool>>(`${ENDPOINT}/pageable?page=${page}&size=${size}&search=${search}`);

export const getToolList = (search: string="")=> 
  axios.get<GenericListResponse<Tool>>(`${ENDPOINT}/list?search=${search}`);