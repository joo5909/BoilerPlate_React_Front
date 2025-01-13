import ResponseDto from "../response.dto";

export default interface SignInResponseDto extends ResponseDto {
    accessToken: string;
    email : string;
    nickname : string;
    profileImage : string | null;
    accessTokenExpirationTime : number;
}
