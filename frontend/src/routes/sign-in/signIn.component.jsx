import Nav from "../nav/nav.component"
import SignIn from "../../components/sign-up-form.component.jsx"
import "../../App.css"

function signIn() {
    return (
        <div className="mainh1ContainerSignIn">
            <Nav/>
            <h1>Sign In</h1>
            <SignIn/>
        </div>
    )
}

export default signIn;