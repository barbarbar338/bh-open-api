import { Component } from "react";
import DocumentMeta from "react-document-meta";
import { Link } from "react-router-dom";
import Banner from "../images/banner.png";
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
                                    href="https://github.com/barbarbar338/bh-open-api"
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

                <footer className="relative">
                    <div className="flex flex-wrap items-center md:justify-between justify-center">
                        <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                            <div className="text-sm text-gray-500 font-semibold py-3">
                                Copyright © {new Date().getFullYear()}{" "}
                                <a
                                    href="https://338.rocks"
                                    className="text-gray-500 hover:text-gray-800"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    barbarbar338
                                </a>{" "}
                                | Made with 💖 and ☕ using{" "}
                                <a
                                    href="https://nestjs.com/"
                                    className="text-gray-500 hover:text-gray-800"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Nest
                                </a>
                                ,{" "}
                                <a
                                    href="https://react.dev/"
                                    className="text-gray-500 hover:text-gray-800"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    React
                                </a>{" "}
                                and{" "}
                                <a
                                    href="https://tailwindcss.com/"
                                    className="text-gray-500 hover:text-gray-800"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Tailwind
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </DocumentMeta>
        );
    }
}
