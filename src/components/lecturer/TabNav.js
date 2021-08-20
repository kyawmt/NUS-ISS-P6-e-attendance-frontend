import { Button } from 'bootstrap';
import React from 'react';


class TabNav extends React.Component {
    render() {
        return (
            <div style = {{width:'100%'}}>
                <ul className = "nav nav-tabs">
                    {
                        this.props.tabs.map(tab => {
                            const active = (tab === this.props.selected? 'active':'');
                            return (
                                <ul className = "nav nav-pills">
                                <li className = "nav-item" key={tab}>
                                <a className = {"nav-link " + active } href = '#' onClick = {()=> this.props.setSelected(tab)}>
                                    {tab}
                                </a>
                                </li>
                                </ul>
                            );
                        })
                    }
                </ul>
                {this.props.children}
            </div>
        );
    }
}
export default TabNav