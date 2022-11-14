import React from "react";
import Header from "./Header";
import Footer from "./Footer"
const Layout = function (props) {
    return (
        <React.Fragment>
            <Header modal = {props.modal} setModal = {props.setModal} />
            {props.children}
            <Footer />
        </React.Fragment>
    )
}
export default Layout