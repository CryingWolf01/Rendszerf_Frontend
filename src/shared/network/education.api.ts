import axios from "../../config/axios";
import { GenericListResponse, GenericPageResponse, GenericResponse } from "../common";
import { Education } from "../types";

const ENDPOINT = "/education"

export const saveEducation = (param: Education)=> 
  axios.post(`${ENDPOINT}/save`, param);

export const getEducationById = (id: number)=> 
  axios.get<GenericResponse<Education>>(`${ENDPOINT}/get-by-id?id=${id}`);

export const getEducationsPageable = (page: number, size: number, search: string = "")=> 
  axios.get<GenericPageResponse<Education>>(`${ENDPOINT}/pageable?page=${page}&size=${size}&search=${search}`);

export const getEducationList = (search: string="")=> 
  axios.get<GenericListResponse<Education>>(`${ENDPOINT}/pageable?search=${search}`);

export const getEducationListByToolCategory = (id:number)=> 
  axios.get<GenericListResponse<Education>>(`${ENDPOINT}/list?id=${id}`);