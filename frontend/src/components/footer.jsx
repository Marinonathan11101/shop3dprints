import instagramImage from "../images/instagram.png"

const footer = () => {
    return (
        <footer>
        <div className="footerContainer">
            <div>
                <p>@2024 SHOP 3D PRINTS BY MATTEO SFORZA</p>
                <p>WEBSITE CREATED BY: NATHAN MARINO</p>
                <a href="https://www.instagram.com/shop3dprints_/" target="_blank" rel="noopener noreferrer">
                    <img src={instagramImage} alt="instagram" />
                </a>
            </div>
        </div>
    </footer>
    )
}

export default footer;