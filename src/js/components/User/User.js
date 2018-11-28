import React, { Component } from 'react';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { connect } from 'react-redux';
import './User.css';

class User extends Component {
    render() {
        console.log(this.props.userReducer)
        return (
            <div>
                {!this.props.userReducer.fetchingUserDetailsSuccess ? <label>Fetching User Details failed</label>: null}
                {this.props.userReducer.fetchingUserDetails ? (<div className="user-div"><Spinner label="loading..." /></div>) : null}
                {!this.props.userReducer.fetchingUserDetails && this.props.userReducer.userData.id !== undefined ?
                    <div className="user-div user-details-div">
                        <img
                            className="user-image"
                            src={this.props.userReducer.userData.avatar}
                            alt="User" /><br />
                        <label className="id-label">{`ID: ${this.props.userReducer.userData.id} `}</label>
                        <label className="name-label">{`Name: ${this.props.userReducer.userData.first_name} ${this.props.userReducer.userData.last_name}`}</label>
                    </div> : null}
            </div>

        );
    }
}

const mapStateToProps = state => ({ ...state });
export default connect(mapStateToProps)(User);