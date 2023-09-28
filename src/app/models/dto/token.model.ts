export interface Token {
    accessToken: AccessToken;
    refreshToken: RefreshToken;
}
  
  export interface AccessToken {
    accessTokenExpiration: string;
    token: string;
}
  
  export interface RefreshToken {
    refreshTokenExpiration: string;
    token: string;
}
  