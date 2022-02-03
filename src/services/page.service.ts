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
    return axios.get("page/id/" + pageId.toString()).then((response) => {
      return response;
    });
  }

  static postPage(newPage: NewPage): Promise<AxiosResponse> {
    return axios
      .post("page/new", { pageTitle: newPage.pageTitle })
      .then((response) => {
        return response;
      });
  }

  static getPageContent(pageId: bigint): Promise<AxiosResponse> {
    return axios
      .get("page/id/" + pageId.toString() + "/content")
      .then((response) => {
        return response;
      });
  }

  static postPageContent(
    pageId: bigint,
    newContent: NewContent
  ): Promise<AxiosResponse> {
    return axios
      .post("page/id/" + pageId.toString() + "/content", {
        contentText: newContent.contentText,
      })
      .then((response) => {
        return response;
      });
  }
}
