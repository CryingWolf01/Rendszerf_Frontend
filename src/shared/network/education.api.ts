import axios from "../../config/axios";
import { Education } from "../types";

const ENDPOINT = "/education"

export const saveEducation = (param: Education)=> 
  axios.post(`${ENDPOINT}/save`, param);

export const getEducationById = (id: number)=> 
  axios.get(`${ENDPOINT}/get-by-id?id=${id}`);

export const getEducationsPageable = (page: number, size: number, search: string = "")=> 
  axios.get(`${ENDPOINT}/pageable?page=${page}&size=${size}&search=${search}`);

export const getEducationList = (search: string="")=> 
  axios.get(`${ENDPOINT}/pageable?search=${search}`);

export const getEducationListByToolCategory = (id:number)=> 
  axios.get(`${ENDPOINT}/list?id=${id}`);