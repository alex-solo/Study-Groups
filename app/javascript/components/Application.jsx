import React from "react";
import TopNav from "./shared/TopNav";
import UsersDashBoard from "./UsersDashBoard";
import GroupsDashBoard from "./GroupsDashBoard";
import { Route, Redirect, Switch } from "react-router-dom";

class Application extends React.Component {
  state = {
    users: [],
    groups: []
  };

  componentDidMount() {
    fetch("/api/users")
      .then(response => {
        return response.json();
      })
      .then(json => {
        json.map(user => {});
        this.setState({ users: json });
        return fetch("api/groups");
      })
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({ groups: json });
      });
  }

  handleFormSubmit = (name, email, groups) => {
    let body = JSON.stringify({
      user: { name: name, email: email },
      groups: groups
    });

    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: body
    })
      .then(response => {
        return response.json();
      })
      .then(user => {
        this.addNewUser(user);
      });
  };

  addNewUser = user => {
    this.setState({
      users: this.state.users.concat(user)
    });
  };

  deleteUser = id => {
    const newUsers = this.state.users.filter(user => user.id !== id);
    this.setState({
      users: newUsers
    });
  };

  handleSaveClick = (id, name, email, groups) => {
    let body = JSON.stringify({
      user: { name: name, email: email },
      groups: groups
    });
    fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: body
    })
      .then(response => {
        return response.json();
      })
      .then(user => {
        this.updateUser(user);
      });
  };

  updateUser = user => {
    let newUsers = this.state.users.map(u => {
      if (u.id !== user.id) {
        return u;
      } else {
        return user;
      }
    });
    this.setState({
      users: newUsers
    });
  };

  render() {
    const { users, groups } = this.state;
    const groupNames = groups.map(group => group.name);

    return (
      <div className="container">
        <TopNav />
        <Switch>
          <Route
            path="/users"
            render={() => (
              <UsersDashBoard
                users={users}
                groupNames={groupNames}
                onFormSubmit={this.handleFormSubmit}
                deleteUser={this.deleteUser}
                onSaveClick={this.handleSaveClick}
              />
            )}
          />
          <Route
            path="/groups"
            render={() => <GroupsDashBoard groups={groups} />}
          />
          <Route exact path="/" render={() => <Redirect to="/users" />} />
        </Switch>
      </div>
    );
  }
}

export default Application;
