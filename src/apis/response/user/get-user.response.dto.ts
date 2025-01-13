import { User } from "types/interface";
import ResponseDto from "../response.dto";


export default interface GetUserResponseDto extends ResponseDto, User {
    address : string | null;
    addressDetail : string | null;
}