
export type CreateOneUserRequest = {
    bodyAuthLevel: number,
    bodyEmail: string,
    bodyPassword: string,
    bodyPhone: string,
    bodyUserStatus: number,
    bodyUsername: string,
}

export const CreateOneUserRequestConvert = (
    body: any,
    query: any,
    path: any,
) => {
  return {
    bodyAuthLevel: parseInt(body.authLevel),
    bodyEmail: body.email,
    bodyPassword: body.password,
    bodyPhone: body.phone,
    bodyUserStatus: parseInt(body.userStatus),
    bodyUsername: body.username,
  };
};
export type LoginUserRequest = {
    bodyEmail: string,
    bodyPassword: string,
}

export const LoginUserRequestConvert = (
    body: any,
    query: any,
    path: any,
) => {
  return {
    bodyEmail: body.email,
    bodyPassword: body.password,
  };
};
export type LogoutUserRequest = {
}

export const LogoutUserRequestConvert = (
    body: any,
    query: any,
    path: any,
) => {
  return {
  };
};
export type DeleteOneUserRequest = {
    pathId: number
}

export const DeleteOneUserRequestConvert = (
    body: any,
    query: any,
    path: any,
) => {
  return {
    pathId: parseInt(path.id),
  };
};
export type ReadOneUserRequest = {
    pathId: number
}

export const ReadOneUserRequestConvert = (
    body: any,
    query: any,
    path: any,
) => {
  return {
    pathId: parseInt(path.id),
  };
};
export type UpdateOneUserRequest = {
    pathId: number
    bodyAuthLevel: number,
    bodyEmail: string,
    bodyPassword: string,
    bodyPhone: string,
    bodyUserStatus: number,
    bodyUsername: string,
}

export const UpdateOneUserRequestConvert = (
    body: any,
    query: any,
    path: any,
) => {
  return {
    pathId: parseInt(path.id),
    bodyAuthLevel: parseInt(body.authLevel),
    bodyEmail: body.email,
    bodyPassword: body.password,
    bodyPhone: body.phone,
    bodyUserStatus: parseInt(body.userStatus),
    bodyUsername: body.username,
  };
};
export type CreateManyUsersRequest = {
    bodyAuthLevel: number,
    bodyEmail: string,
    bodyPassword: string,
    bodyPhone: string,
    bodyUserStatus: number,
    bodyUsername: string,
}

export const CreateManyUsersRequestConvert = (
    body: any,
    query: any,
    path: any,
) => {
  const arrayBody = body.map((e: any) => {
    return {
      bodyAuthLevel: parseInt(e.authLevel),
      bodyEmail: e.email,
      bodyPassword: e.password,
      bodyPhone: e.phone,
      bodyUserStatus: parseInt(e.userStatus),
      bodyUsername: e.username,
    };
  });
  return arrayBody;
};
