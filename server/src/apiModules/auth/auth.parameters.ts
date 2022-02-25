
export type CreateOneAuthRequest = {
    bodyLevel: number,
    bodyRole: number,
}

export const CreateOneAuthRequestConvert = (
    body: any,
    query: any,
    path: any,
) => {
  return {
    bodyLevel: parseInt(body.level),
    bodyRole: parseInt(body.role),
  };
};
export type DeleteOneAuthRequest = {
    pathId: number
}

export const DeleteOneAuthRequestConvert = (
    body: any,
    query: any,
    path: any,
) => {
  return {
    pathId: parseInt(path.id),
  };
};
export type UpdateOneAuthRequest = {
    pathId: number
    bodyLevel: number,
    bodyRole: number,
}

export const UpdateOneAuthRequestConvert = (
    body: any,
    query: any,
    path: any,
) => {
  return {
    pathId: parseInt(path.id),
    bodyLevel: parseInt(body.level),
    bodyRole: parseInt(body.role),
  };
};
export type ReadManyAuthRequest = {
}

export const ReadManyAuthRequestConvert = (
    body: any,
    query: any,
    path: any,
) => {
  return {
  };
};
