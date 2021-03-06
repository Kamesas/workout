import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import Tabs from "./Tabs";
import { connect } from "react-redux";
//import moment from "moment";
//import "moment/locale/ru";
import UsersLogin from "./UsersLogin/UsersLogin";
import {
  addUserValues,
  fetchWorkoutValues,
  fetchOpponentValues,
  fetchworkoutUser,
  usersLogin
} from "../../store/actions/workoutActions";
import stl from "./WorkOut.module.sass";

class WorkOut extends Component {
  state = { userLogin: "Opponent" };

  componentDidMount() {
    this.props.fetchworkoutUser();
    this.props.fetchOpponentValues(this.state.userLogin);
    this.props.usersLogin();
    if (
      this.props.workoutUser !== "undefinded user" &&
      this.props.workoutUser
    ) {
      this.props.fetchWorkoutValues(this.props.workoutUser.displayName);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.workoutUser !== this.props.workoutUser) {
      this.props.workoutUser
        ? this.props.fetchWorkoutValues(this.props.workoutUser.displayName)
        : alert("Залогинтесьы");
    }
    if (prevState.userLogin !== this.state.userLogin) {
      this.props.fetchOpponentValues(this.state.userLogin);
    }
  }

  selectedUser = userLogin => {
    this.setState({ userLogin });
  };

  render() {
    const {
      workoutValues,
      workoutUser,
      opponentValues,
      allUsersLogin
    } = this.props;

    if (!this.props.fetchWorkoutValues) {
      return "loading";
    }
    return (
      <Grid divided="vertically">
        <Grid.Column computer={8} mobile={16}>
          <h3>{workoutUser && workoutUser.displayName}</h3>

          <Tabs workoutUser={workoutUser} workoutValues={workoutValues} />
        </Grid.Column>

        <Grid.Column computer={8} mobile={16}>
          <div className={stl["opponent-header"]}>
            <h3>{this.state.userLogin}</h3>
            <UsersLogin
              allUsersLogin={allUsersLogin}
              selectedUser={this.selectedUser}
            />
          </div>
          <Tabs workoutValues={opponentValues} />
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  workoutValues: state.workoutValues,
  workoutUser: state.workoutUser,
  opponentValues: state.opponentValues,
  allUsersLogin: state.usersLogin
});

const mapDispatchToProps = dispatch => ({
  addUserValues: newValue => dispatch(addUserValues(newValue)),
  fetchworkoutUser: () => dispatch(fetchworkoutUser()),

  fetchWorkoutValues: childLoginUser =>
    dispatch(fetchWorkoutValues(childLoginUser)),

  fetchOpponentValues: childLoginUser =>
    dispatch(fetchOpponentValues(childLoginUser)),

  usersLogin: () => dispatch(usersLogin())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkOut);
