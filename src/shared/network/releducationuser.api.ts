import axios from "../../config/axios";
import { GenericListResponse, GenericPageResponse, GenericResponse } from "../common";
import { RelEducationUser } from "../types";

const ENDPOINT = "/education"

export const saveEducation = (param: RelEducationUser)=> 
  axios.post(`${ENDPOINT}/save`, {param});

export const getEducationById = (id: number)=> 
  axios.get<GenericResponse<RelEducationUser>>(`${ENDPOINT}/get-by-id?id=${id}`);

export const getEducationsPageable = (page: number, size: number, search: string = "")=> 
  axios.get<GenericPageResponse<RelEducationUser>>(`${ENDPOINT}/pageable?page=${page}&size=${size}&search=${search}`);

export const getEducationList = (search: string="")=> 
  axios.get<GenericListResponse<RelEducationUser>>(`${ENDPOINT}/list?search=${search}`);