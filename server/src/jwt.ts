import jwt from 'jsonwebtoken';

class ApiKey {
  public name;
  public expiresIn;

  constructor(name: string, expiresIn: number) {
    this.name = name;
    this.expiresIn = expiresIn;
  }

  generateAccessToken(payload: Object) {
    return jwt.sign(
        payload,
        process.env['TOKEN_SECRET'] as string,
        {expiresIn: this.expiresIn},
    );
  }

  tokenVerify(token: string) {
    const res = jwt.verify(
        token,
        process.env['TOKEN_SECRET'] as string,
    );
    return res;
  }
}

export const userInfoApiKey = new ApiKey('userInfo', 7 * 24 * 60 * 60 * 1000);


