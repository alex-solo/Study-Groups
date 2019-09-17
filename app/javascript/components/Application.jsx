import React from "react";
import TopNav from "./shared/TopNav";
import Flash from "./shared/Flash";
import UsersDashBoard from "./UsersDashBoard";
import GroupsDashBoard from "./GroupsDashBoard";
import { Route, Redirect, Switch } from "react-router-dom";

class Application extends React.Component {
  state = {
    users: [],
    groups: [],
    flash: { message: "", type: "" }
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
        this.flashMessage("A new user has been added successfully", "success");
        return fetch("api/groups");
      })
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({ groups: json });
      });
  };

  flashMessage = (message, type) => {
    this.setState({
      flash: {
        message: message,
        type: type
      }
    });
    setTimeout(() => {
      this.resetFlashState();
    }, 3000);
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
        this.flashMessage("A new group was successfully added", "success");
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
    if (this.state.users.find(user => user.id === id).groups.length === 0) {
      fetch(`/api/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response => {
        this.deleteUser(id);
        this.flashMessage("User was successfully deleted", "success");
      });
    } else {
      this.flashMessage(
        "Cannot delete user that is still subscribed to groups",
        "error"
      );
    }
  };

  deleteUser = id => {
    const newUsers = this.state.users.filter(user => user.id !== id);
    this.setState({
      users: newUsers
    });
  };

  handleDeleteGroup = id => {
    if (this.state.groups.find(group => group.id === id).users.length === 0) {
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
          this.flashMessage("Group was successfully deleted", "success");
        });
    } else {
      this.flashMessage(
        "Cannot delete a group that still has members",
        "error"
      );
    }
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
        this.flashMessage("User has been successfully edited", "success");
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
        this.flashMessage("Group has been successfully edited", "success");
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

  resetFlashState = () => {
    this.setState({ flash: { message: "", type: "" } });
  };

  render() {
    const { users, groups } = this.state;
    const groupNames = groups.map(group => group.name);

    return (
      <div className="container">
        <TopNav />
        <Flash flash={this.state.flash} onFlashClose={this.resetFlashState} />
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
