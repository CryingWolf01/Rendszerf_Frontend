import axios from "../../config/axios";
import { GenericListResponse, GenericPageResponse, GenericResponse } from "../common";
import { User } from "../types";

const ENDPOINT = "/user"

type LoginValues = {
  username: string;
  password: string;
};

export const saveUser = (param: User)=> 
  axios.post(`${ENDPOINT}/save`, {param});

export const loginUser = (param: LoginValues)=> 
  axios.post<GenericResponse<User>>(`${ENDPOINT}/login`, { param });
  
export const getUsersPageable = (page: number, size: number, search: string = "")=> 
  axios.get<GenericPageResponse<User>>(`${ENDPOINT}/pageable?page=${page}&size=${size}&search=${search}`);

export const getUserList = (search: string="")=> 
  axios.get<GenericListResponse<User>>(`${ENDPOINT}/list?search=${search}`);