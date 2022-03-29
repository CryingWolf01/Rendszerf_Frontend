import axios from "../../config/axios";
import { GenericListResponse, GenericPageResponse, GenericResponse } from "../common";
import { RelEducationToolCategory } from "../types";

const ENDPOINT = "/rel-education-tool-category"

export const saveEducation = (param: RelEducationToolCategory)=> 
  axios.post(`${ENDPOINT}/save`, {param});

export const getEducationById = (id: number)=> 
  axios.get<GenericResponse<RelEducationToolCategory>>(`${ENDPOINT}/get-by-id?id=${id}`);

export const getEducationsPageable = (page: number, size: number, search: string = "")=> 
  axios.get<GenericPageResponse<RelEducationToolCategory>>(`${ENDPOINT}/pageable?page=${page}&size=${size}&search=${search}`);

export const getEducationList = (search: string="")=> 
  axios.get<GenericListResponse<RelEducationToolCategory>>(`${ENDPOINT}/pageable?search=${search}`);