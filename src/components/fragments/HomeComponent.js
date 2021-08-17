import React, { Component } from 'react';

import mainPagePNG from '../media/11_login_main.png';
import LoginComponent from './LoginComponent';

class HomeComponent extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row align-items-center mt-4">
                    <div className="col d-flex justify-content-center">
                    <h1>E-ATTENDANCE APP</h1>
                    </div>
                </div>
                <div className="row align-items-center mt-2 mb-0">
                <div className="col col-sm-1 d-flex justify-content-center">
                    </div>
                    <div className="col col-sm-3 d-flex justify-content-center"></div>
                    <div className="col col-sm-4 d-flex justify-content-center customMinWidth">
                    <p className="text-muted justify-content-center">saving your time spent on administration <br/> so that you can focus on the finer things</p>
                    </div>
                    <div className="col col-sm-3 d-flex justify-content-center"></div>
                    <div className="col col-sm-1 d-flex justify-content-center"></div>
                </div>
                <div className="row align-items-center">
                    <div className="col d-flex justify-content-center">
                    <img src={mainPagePNG} alt="mainPage"  height="500"/>
                    </div>
                </div>
                <div className="row align-items-center pl-4">
                    <div className="col d-flex justify-content-center custom-col">
                    <a href={"./login"} component={LoginComponent} className="no-underline">
                    <button className="btn btn-toolbar justify-content-center" type="button">Login</button></a>
                    </div>
                
                </div>
                
                </div>
            </div>
        );
    }
}

export default HomeComponent;