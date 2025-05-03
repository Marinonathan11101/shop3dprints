import Nav from "../routes/nav/nav.component"
import Footer from "./footer"
import logo from "../images/logo.png"
import '../App.css';


const AboutPage = () => {

    return (

        <div className="aboutPageContainer" >
            <Nav />
            <div className="OurStoryContainer">
                <div className="OurStory">
                    <h2>Our Story</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam maiores unde aliquid beatae, voluptatum, adipisci impedit doloremque temporibus sed iure aliquam eius nam dignissimos quasi eaque voluptate, accusamus ullam recusandae.</p>
                </div>

                <div className="OurStoryImg">
                    <img src={logo} alt="" />
                </div>
            </div>

            <Footer />
        </div>

    )

}
export default AboutPage