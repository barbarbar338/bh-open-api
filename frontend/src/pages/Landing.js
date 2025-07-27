import { Component } from "react";
import Banner from "../components/Landing/Banner";
import Example from "../components/Landing/Example";
import Layout from "../components/Layout";

export default class Landing extends Component {
    state = {
        meta: {
            title: "Brawlhalla Open API",
            description:
                "An unofficial API server with no connection to Brawlhalla and its developers, prepared for easier and unlimited access to Brawlhalla API services.",
        },
    };
    render() {
        return (
            <Layout meta={this.state.meta}>
                <div className="container">
                    <Banner />
                    <hr />
                    <Example />
                </div>
            </Layout>
        );
    }
}
