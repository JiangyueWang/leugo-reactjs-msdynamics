import { SignInButton } from "../../components/SignInButton/SignInButton"
import { SignOutButton } from "../../components/SignOutButton/SignOutButton"
import { useIsAuthenticated } from "@azure/msal-react";
import { useMsal, useAccount } from '@azure/msal-react';
import { Link } from "react-router-dom";

const SiteHeader = () => {
    const isAuthenticated = useIsAuthenticated();
    const {accounts} = useMsal();
    const user = useAccount(accounts[0] || {});
    return(
        <div>     
            <p>logo</p>  
            <nav>
            <ul>
                {user ? 
                    (<div>
                        <li>
                            <Link to={`/`}>home</Link>
                        </li>
                        <li>
                            <Link to={`${user.name}/collection`}>collection</Link>
                        </li>
                        <li>wish list</li>
                    </div>) : null}
            </ul>
            {isAuthenticated ? <SignOutButton /> : <SignInButton />}
            </nav>
        </div>

    )
}

export default SiteHeader