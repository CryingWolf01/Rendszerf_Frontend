import axios from "../../config/axios";
import { GenericListResponse, GenericPageResponse, GenericResponse } from "../common";
import { RelEducationUser } from "../types";

const ENDPOINT = "/education"

export const saveEducationUser = (param: RelEducationUser)=> 
  axios.post(`${ENDPOINT}/save`, {param});

export const getEducationUserById = (id: number)=> 
  axios.get<GenericResponse<RelEducationUser>>(`${ENDPOINT}/get-by-id?id=${id}`);

export const getEducationUsersPageable = (page: number, size: number, search: string = "")=> 
  axios.get<GenericPageResponse<RelEducationUser>>(`${ENDPOINT}/pageable?page=${page}&size=${size}&search=${search}`);

export const getEducationUserList = (search: string="")=> 
  axios.get<GenericListResponse<RelEducationUser>>(`${ENDPOINT}/list?search=${search}`);