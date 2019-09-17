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

  handleCreateUser = (name, email, groups) => {
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
        return fetch("api/groups");
      })
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({ groups: json });
      });
  };

  handleCreateGroup = (name, description) => {
    console.log(name);
    console.log(description);
    let body = JSON.stringify({
      group: {
        name: name,
        description: description
      }
    });

    fetch("/api/groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: body
    })
      .then(response => {
        return response.json();
      })
      .then(group => {
        this.addNewGroup(group);
      });
  };

  addNewGroup = group => {
    this.setState({
      groups: this.state.groups.concat(group)
    });
  };

  addNewUser = user => {
    this.setState({
      users: this.state.users.concat(user)
    });
  };

  handleDeleteUser = id => {
    fetch(`/api/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      this.deleteUser(id);
    });
  };

  deleteUser = id => {
    const newUsers = this.state.users.filter(user => user.id !== id);
    this.setState({
      users: newUsers
    });
  };

  handleDeleteGroup = id => {
    fetch(`/api/groups/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        this.deleteGroup(id);
        return fetch("api/users");
      })
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({ users: json });
      });
  };

  deleteGroup = id => {
    const newGroups = this.state.groups.filter(group => group.id !== id);
    this.setState({
      groups: newGroups
    });
  };

  handleUpdateUserClick = (id, name, email, groups) => {
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
        return fetch("api/groups");
      })
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({ groups: json });
      });
  };

  handleUpdateGroupClick = (id, name, description) => {
    let body = JSON.stringify({
      group: {
        name: name,
        description: description
      }
    });

    fetch(`/api/groups/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: body
    })
      .then(response => {
        return response.json();
      })
      .then(group => {
        this.updateGroup(group);
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

  updateGroup = group => {
    let newGroups = this.state.groups.map(g => {
      if (g.id !== group.id) {
        return g;
      } else {
        return group;
      }
    });

    this.setState({
      groups: newGroups
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
                onFormSubmit={this.handleCreateUser}
                onDeleteClick={this.handleDeleteUser}
                onSaveClick={this.handleUpdateUserClick}
              />
            )}
          />
          <Route
            path="/groups"
            render={() => (
              <GroupsDashBoard
                groups={groups}
                onFormSubmit={this.handleCreateGroup}
                onDeleteClick={this.handleDeleteGroup}
                onSaveClick={this.handleUpdateGroupClick}
              />
            )}
          />
          <Route exact path="/" render={() => <Redirect to="/users" />} />
        </Switch>
      </div>
    );
  }
}

export default Application;
