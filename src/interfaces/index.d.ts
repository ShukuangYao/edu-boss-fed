export interface Category {
  id: number;
  name: string;
  sort: number;
  createdTime?: string;
}

export interface Advert {
  id?: number|string;
  name: string;
  spaceId?: number;
  keyword?: string;
  htmlContent?: string;
  text?: string;
  img?: string;
  link: string;
  startTime: string;
  endTime: string;
  status: number;
  priority?: number;
  space?: string;
  isStatusLoading?: boolean;
}

export interface AdvertSpace {
  id?: number|string;
  name: string;
  spaceKey?: string;
  isDel?: number;
  adDTOList?: Advert[];
}

export interface AdvertStatus {
  id: number|string;
  status: number;
}
