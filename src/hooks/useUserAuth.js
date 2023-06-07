import { useContext } from "react";
import UserAuthContext from '../context/UserAuthContext';

const useUserAuth = () => {
    const {user, userToken} = useContext(UserAuthContext);
    return [user, userToken];
}

export default useUserAuth;