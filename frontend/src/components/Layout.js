import DocumentMeta from "react-document-meta";
import Banner from "../images/banner.png";
import { Link } from "react-router-dom";
import { Component } from "react";
export default class Layout extends Component {
    render() {
        return (
            <DocumentMeta {...this.props.meta}>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to="/">
                        <img
                            src={Banner}
                            width="100"
                            className="d-inline-block align-top"
                            alt="Banner"
                            loading="lazy"
                        />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarNavDropdown"
                    >
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item active">
                                <a
                                    className="nav-link"
                                    href="https://github.com/barbarbar338/bh-open-api-webpage"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    GitHub
                                </a>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link" to="/features">
                                    Features
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                {this.props.children}
            </DocumentMeta>
        );
    }
}
