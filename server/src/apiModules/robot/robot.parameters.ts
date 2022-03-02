
export type ReadManyDHTDataRequest = {
}

export const ReadManyDHTDataRequestConvert = (
    body: any,
    query: any,
    path: any,
) => {
  return {
  };
};

export type ReadOneDHTDataRequest = {
    pathId: number
}

export const ReadOneDHTDataRequestConvert = (
    body: any,
    query: any,
    path: any,
) => {
  return {
    pathId: parseInt(path.id),
  };
};
export type CreateOneDHTDataRequest = {
    pathId: number
    bodyHumi: number,
    bodyTemp: number,
    bodyYaxios: number,
}

export const CreateOneDHTDataRequestConvert = (
    body: any,
    query: any,
    path: any,
) => {
  return {
    pathId: parseInt(path.id),
    bodyHumi: parseInt(body.humi),
    bodyTemp: parseInt(body.temp),
    bodyYaxios: parseInt(body.yAxios),
  };
};
