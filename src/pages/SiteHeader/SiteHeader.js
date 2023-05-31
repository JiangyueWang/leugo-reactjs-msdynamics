import { SignInButton } from "../../components/SignInButton/SignInButton"
import { SignOutButton } from "../../components/SignOutButton/SignOutButton"
import { useIsAuthenticated } from "@azure/msal-react";

const SiteHeader = () => {
    const isAuthenticated = useIsAuthenticated();
    return(
        <div>     
            <p>logo</p>  
            <nav>
            <ul>
                <li>home</li>
                <li>collection</li>
                <li>wish list</li>
            </ul>
            </nav>
            {isAuthenticated ? <SignOutButton /> : <SignInButton />}
        </div>

    )
}

export default SiteHeader