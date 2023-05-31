import { SignInButton } from "../../components/SignInButton/SignInButton"
import { SignOutButton } from "../../components/SignOutButton/SignOutButton"

const SiteHeader = () => {
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
            <SignInButton />
            <SignOutButton />
        </div>

    )
}

export default SiteHeader