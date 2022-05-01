import axios from "../../config/axios";
import { GenericListResponse, GenericPageResponse, GenericResponse } from "../common";
import { Issue } from "../types";

const ENDPOINT = "/issue"

export const saveIssue = (param: Issue)=> 
  axios.post(`${ENDPOINT}/save`, {param});

export const getIssueById = (id: number)=> 
  axios.get<GenericResponse<Issue>>(`${ENDPOINT}/get-by-id?id=${id}`);

export const getIssuesPageable = (page: number, size: number, search: string = "")=> 
  axios.get<GenericPageResponse<Issue>>(`${ENDPOINT}/pageable?page=${page}&size=${size}&search=${search}`);

export const getISsueList = (search: string="")=> 
  axios.get<GenericListResponse<Issue>>(`${ENDPOINT}/list?search=${search}`);