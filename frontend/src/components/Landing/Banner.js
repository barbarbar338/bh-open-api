import { Link } from "react-router-dom";
import CONFIG from "../../config";
import BannerImage from "../../images/banner.png";

export default function Banner() {
    return (
        <section className="text-center mg-auto pd-1-5">
            <img
                src={BannerImage}
                alt="Banner"
                style={{
                    width: "50%",
                    height: "auto",
                }}
            />
            <h1>Brawlhalla Open API</h1>
            <p className="lead">
                An unofficial API server with no connection to Brawlhalla and
                its developers, prepared for easier and unlimited access to
                Brawlhalla API services.
            </p>
            <p className="lead">
                Default API URL:{" "}
                <a href={CONFIG.API_URL} target="_blank" rel="noreferrer">
                    {CONFIG.API_URL}
                </a>
            </p>
            <Link className="btn btn-lg btn-outline-primary" to="/features">
                See Features
            </Link>
        </section>
    );
}
