import { Component } from "react";
import Banner from "../components/Features/Banner";
import FeatureItem from "../components/Features/FeatureItem";
import Layout from "../components/Layout";
import FEATURES from "../features";

export default class Landing extends Component {
    state = {
        meta: {
            title: "Brawlhalla Open API - Features",
            description: "All features that the system offers you.",
        },
    };
    handleFeatures() {
        return FEATURES.map((featureItemData, i) => {
            return <FeatureItem key={i} {...featureItemData} />;
        });
    }
    render() {
        return (
            <Layout meta={this.state.meta}>
                <div className="container">
                    <Banner />
                    <hr />
                    <section className="pd-1-5">
                        <div className="row">{this.handleFeatures()}</div>
                    </section>
                </div>
            </Layout>
        );
    }
}
