import useLoginUserStore from 'stores/user.store';
import { getUserInfo } from 'apis'
import { ResponseCode, ResponseMessage } from 'types/enum';

export const syncUserInfo = async (newAccessToken : string) => {
    const {setLoginUser, resetLoginUser} = useLoginUserStore();

  
    try {
      const userInfo = await getUserInfo();

      const code  = userInfo?.code;      

      if (code === ResponseCode.DATABASE_ERROR) {
        alert(ResponseMessage.DATABASE_ERROR);
        resetLoginUser();
    
      }
      if (code === ResponseCode.SIGN_IN_FAIL || ResponseCode.VALIDATION_FAILED) {
        alert("로그인이 필요합니다.");
        resetLoginUser();
      }
      if (code !== ResponseCode.SUCCESS){
        alert("로그인이 필요합니다.");
        resetLoginUser();
      }

      // 세션스토리지에 저장
      sessionStorage.setItem('accessToken', newAccessToken);    

      if (userInfo) {
        setLoginUser({
          email: userInfo.email,
          nickname: userInfo.nickname,
          profileImage: userInfo.profileImage || '',
        });
      } else {
        resetLoginUser();
      }
    } catch (error) {
      console.error('Failed to sync user info:', error);
      resetLoginUser();
    }
  };