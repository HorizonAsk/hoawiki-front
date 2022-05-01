import axios from "@/utils/axios";
import { AxiosResponse } from "axios";

export interface PageLinkResponse {
  pageFrom: bigint;
  pageTo: bigint;
  pageLinkId: bigint;
}

export class PageLinkService {
  static getPageLinkOf(pageId: bigint, depth = 2): Promise<AxiosResponse> {
    return axios
      .get("pagelinks?pageId=" + pageId.toString() + "&depth=" + depth)
      .then((response) => {
        return response;
      });
  }

  static getPageLinkTo(pageId: bigint): Promise<AxiosResponse> {
    return axios
      .get("pagelinks/to?pageId=" + pageId.toString())
      .then((response) => {
        return response;
      });
  }

  static getPageLinkFrom(pageId: bigint): Promise<AxiosResponse> {
    return axios
      .get("pagelinks/from?pageId=" + pageId.toString())
      .then((response) => {
        return response;
      });
  }
}
