export class ResponseUtil {
  private status: boolean;
  private data?: any;

  public constructor() {
    this.status = true;
  }

  public setStatus(status: boolean): ResponseUtil {
    this.status = status;
    return this;
  }

  public setData(data: any): ResponseUtil {
    this.data = data;
    return this;
  }
}
