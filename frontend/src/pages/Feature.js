import { Component } from "react";
import { toast } from "react-toastify";
import Banner from "../components/Feature/Banner";
import Layout from "../components/Layout";

export default class Landing extends Component {
    state = {
        meta: {
            title: `Brawlhalla Open API - ${this.props.title}`,
            description: `${this.props.title}`,
        },
        query: this.props.query,
        response: JSON.stringify(
            {
                foo: "bar",
            },
            null,
            4,
        ),
    };
    handleQueryChange = (e) => {
        this.setState({
            query: e.target.value,
        });
    };
    handleButtonClick = async () => {
        if (!this.state.query || this.state.query.length < 1)
            return this.createErrorToast("Specify a request query");

        const apiURL = `${window.location.protocol}//${window.location.host}/v1/`;
        const request = await fetch(`${apiURL}${this.state.query}`);
        const response = await request.json();
        if (!request.ok) return this.createErrorToast(response.message);
        this.setState({
            response: JSON.stringify(response, null, 4),
        });
        this.createSuccessToast(this.state.query);
    };
    createErrorToast(str) {
        return toast.error(`⛔ ${str}`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    createSuccessToast(str) {
        return toast.success(`✅ ${str}`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    render() {
        return (
            <Layout meta={this.state.meta}>
                <div className="container">
                    <Banner title={this.props.title} />
                    <hr />
                    <section className="pd-1-5">
                        <div className="row">
                            <div className="col-sm-6">
                                <h3>Request Input</h3>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            api/
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Route"
                                        defaultValue={this.state.query}
                                        className="form-control"
                                        onChange={this.handleQueryChange}
                                    />
                                    <div className="input-group-append">
                                        <button
                                            className="btn btn-outline-secondary"
                                            onClick={this.handleButtonClick}
                                        >
                                            Make Request
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <h3>Response</h3>
                                <textarea
                                    rows="10"
                                    className="form-control rounded-0"
                                    value={this.state.response}
                                    readOnly
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </Layout>
        );
    }
}
