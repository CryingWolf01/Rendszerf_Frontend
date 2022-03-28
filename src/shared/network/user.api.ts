import axios from "../../config/axios";
import { User } from "../types";

const ENDPOINT = "/user"

export const saveUser = (param: User)=> 
  axios.post(`${ENDPOINT}/save`, param);

export const loginUser = (param: User)=> 
  axios.post(`${ENDPOINT}/login`, param);

export const getUsersPageable = (page: number, size: number, search: string = "")=> 
  axios.get(`${ENDPOINT}/pageable?page=${page}&size=${size}&search=${search}`);

export const getUserList = (search: string="")=> 
  axios.get(`${ENDPOINT}/list?search=${search}`);