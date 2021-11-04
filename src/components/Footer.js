import React from "react";

function Footer(props) {
    return (
        <div className="footer bg-dark sticky-bottom">
            <div className="container text-white">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-5 text-center mt-3">
                        <h5>Contact</h5>
                        <address>
                            NAM ĐỊNH - VIỆT NAM
                            <br />
                            <i className="fa fa-phone fa-lg"></i>: 080-7600-9866
                            <br />
                            <i className="fa fa-envelope fa-lg"></i>:{" "}
                            <a href="mailto:vanvtfx12217@funix.edu.vn">vanvtfx12217@funix.edu.vnt</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-5 align-self-center">
                        <div className="text-center">
                            <a
                                className="btn btn-social-icon btn-google"
                                href="http://google.com/+"
                            >
                                <i className="fa fa-google-plus"></i>
                            </a>
                            <a
                                className="btn btn-social-icon btn-facebook"
                                href="http://www.facebook.com/profile.php?id="
                            >
                                <i className="fa fa-facebook"></i>
                            </a>
                            <a
                                className="btn btn-social-icon btn-linkedin"
                                href="http://www.linkedin.com/in/"
                            >
                                <i className="fa fa-linkedin"></i>
                            </a>
                            <a
                                className="btn btn-social-icon btn-twitter"
                                href="http://twitter.com/"
                            >
                                <i className="fa fa-twitter"></i>
                            </a>
                            <a
                                className="btn btn-social-icon btn-google"
                                href="http://youtube.com/"
                            >
                                <i className="fa fa-youtube"></i>
                            </a>
                            <a className="btn btn-social-icon" href="mailto:">
                                <i className="fa fa-envelope-o"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <p>©vanvuFX12217 - RJS101x_01-A_VN_DN</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
