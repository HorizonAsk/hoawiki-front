import axios from "@/utils/axios";
import { AxiosResponse } from "axios";

export interface NewPage {
  pageTitle: string;
}

export interface NewContent {
  contentText: string;
}

export class PageService {
  static getPage(pageId: bigint): Promise<AxiosResponse> {
    return axios.get("pages/" + pageId.toString()).then((response) => {
      return response;
    });
  }

  static postPage(newPage: NewPage): Promise<AxiosResponse> {
    return axios
      .post("pages/", { pageTitle: newPage.pageTitle })
      .then((response) => {
        return response;
      });
  }

  static getPageContent(pageId: bigint): Promise<AxiosResponse> {
    return axios
      .get("pages/" + pageId.toString() + "/contents/latest")
      .then((response) => {
        return response;
      });
  }

  static postPageContent(
    pageId: number | string,
    newContent: NewContent
  ): Promise<AxiosResponse> {
    return axios
      .post("pages/" + pageId.toString() + "/contents", {
        contentText: newContent.contentText,
      })
      .then((response) => {
        return response;
      });
  }

  static getLatestPages(currentPage: number): Promise<AxiosResponse> {
    return axios
      .get("pages", {
        params: {
          currentPage: currentPage,
        },
      })
      .then((response) => {
        return response;
      });
  }
}
