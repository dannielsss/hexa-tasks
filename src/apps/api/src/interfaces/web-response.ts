export default interface IWebResponse<DataType> {
  message: string | string[];
  status: boolean;
  data: DataType;
}
