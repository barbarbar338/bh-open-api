import { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import FEATURES from "./features";
import Feature from "./pages/Feature";
import Features from "./pages/Features";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";

export default class App extends Component {
    handleFeatureRedirects() {
        return FEATURES.map((featureData, i) => {
            return (
                <Route
                    key={i}
                    path={featureData.path}
                    element={<Feature {...featureData} />}
                />
            );
        });
    }
    render() {
        return (
            <div id="app">
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/features" element={<Features />} />
                        {this.handleFeatureRedirects()}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }
}
