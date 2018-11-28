import React, { Component } from 'react';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { getUserDetails, clearData } from './js/actions/userAction';
import { connect } from 'react-redux';
import User from './js/components/User/User';
import './resources/css/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      /* To store Department to User details - initial data provided */
      data: {
        "HR": [1, 2, 3, 4, 5],
        "ENGINEERING": [6, 7, 8, 9, 10]
      },
      /*To Store selected Department */
      selectedDepartment: { key: '0' },
      /* To Store selected Employee */
      selectedUser: { key: '0' }
    }
  }

  /*
    fetch Users under the selected department
  */
  onChangeDepartment = (event, item) => {
    if (item && item.key) {
      this.setState({ selectedDepartment: item, selectedUser: { key: '0' } });
    }
  }

  /*
    fetch User Details through user Action method on click of Get Details button
   */
  getUserDetails = (event) => {
    if (this.state.selectedUser && "" != this.state.selectedUser) {
      this.props.getUserDetails(this.state.selectedUser.key);
    }
  }

  /*
    Clears the selection
  */
  clearSelection = (event) => {
    this.setState({ selectedDepartment: { key: '0' }, selectedUser: { key: '0' } });
    this.props.clearData();
  }

  /*
    On Selection of the user - state value is updated
  */
  onChangeUser = (event, item) => {
    if (item && item.key) {
      this.setState({ selectedUser: item });
    }
  }

  /*
    Get options array based on the array of userId passed
  */
  getOptionsArray(items) {
    let options = [], option = {};

    option.key = 0;
    option.text = "Select User";
    options.push(option);

    if (items) {
      for (let i = 0; i < items.length; i++) {
        option = {};
        option.key = items[i];
        option.text = items[i];
        options.push(option);
      }
    }
    return options;
  }

  /*
    Render UserDropdown element based on selection of different department
  */
  renderUserDropdown(selectedDepartment) {
    let optionsAvailable = [];
    if (selectedDepartment && selectedDepartment.key && "0" != selectedDepartment.key) {
      optionsAvailable = this.getOptionsArray(this.state.data[selectedDepartment.key]);
    }
    return (
      <Dropdown
        label="Employee ID:"
        selectedKey={this.state.selectedUser ? this.state.selectedUser.key : undefined}
        onChange={this.onChangeUser}
        placeholder="Select User"
        options={optionsAvailable}
      />
    );
  }

  componentWillUnmount() {
    this.props.clearData();
  }

  render() {
    return (
      <div className="App">
        <header>
          <div className="row">
            <div className="row1-col dropdown-col">
              <Dropdown
                label="Departments:"
                selectedKey={this.state.selectedDepartment ? this.state.selectedDepartment.key : undefined}
                onChange={this.onChangeDepartment}
                placeholder="Select Department"
                options={[
                  { key: '0', text: 'Select Department' },
                  { key: 'HR', text: 'HR' },
                  { key: 'ENGINEERING', text: 'ENGINEERING' },
                ]}
              />
            </div>
            <div className="row1-col dropdown-col">
              {this.renderUserDropdown(this.state.selectedDepartment)}
            </div>
            <div className="row1-col btn-col">
              <div className="col">
                <PrimaryButton
                  disabled={"0" == this.state.selectedUser.key}
                  text="Get Details"
                  onClick={this.getUserDetails}
                />
              </div>
              <div className="col">
                <DefaultButton
                  disabled={"0" === this.state.selectedUser.key || "0" === this.state.selectedDepartment.key}
                  text="Clear"
                  onClick={this.clearSelection}
                  allowDisabledFocus={true}
                />
              </div>

            </div>
          </div>
          <div>
            <User />
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state });
const mapDispatchToProps = dispatch => ({
  getUserDetails: (userId) => dispatch(getUserDetails(userId)),
  clearData: () => dispatch(clearData())
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
