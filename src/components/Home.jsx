import React from "react";

import withAuthorization from "./withAuthorization";

import * as users from "../bussiness/users";

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null
    };
  }

  componentDidMount() {
    users.onceGetUsers().then(snapshot => {
      this.setState({ users: snapshot.val() });
    });
  }

  render() {
    const { users } = this.state;

    return (
      <div>
        <h1>Home Page</h1>
        <p>The Home Page is accesible by every signed in user</p>
        {!!users && <UserList users={users} />}
      </div>
    );
  }
}

const UserList = ({ users }) => (
  <div>
    <h1>List of Usernames of Users</h1>
    <p>(Saved on Sign Up in Firebase Database)</p>
    {Object.keys(users).map(key => <div key={key}>{users[key].username}</div>)}
  </div>
);

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(HomePage);
