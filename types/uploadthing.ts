export type UploadThingResponse = {
  name: string;
  size: number;
  key: string;
  url: string;
  serverData?: {
    url: string;
  };
};
