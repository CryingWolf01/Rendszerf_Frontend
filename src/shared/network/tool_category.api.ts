import axios from "../../config/axios";
import { GenericListResponse, GenericPageResponse, GenericResponse } from "../common";
import { ToolCategory } from "../types";

const ENDPOINT = "/tool-category"

export const saveToolCategory = (param: ToolCategory)=> 
  axios.post(`${ENDPOINT}/save`, {param});

export const getToolCategoryById = (id: number)=> 
  axios.get<GenericResponse<ToolCategory>>(`${ENDPOINT}/get-by-id?id=${id}`);

export const getToolCategoryPageable = (page: number, size: number, search: string = "")=> 
  axios.get<GenericPageResponse<ToolCategory>>(`${ENDPOINT}/pageable?page=${page}&size=${size}&search=${search}`);

export const getToolCategoryList = (search: string="")=> 
  axios.get<GenericListResponse<ToolCategory>>(`${ENDPOINT}/list?search=${search}`);