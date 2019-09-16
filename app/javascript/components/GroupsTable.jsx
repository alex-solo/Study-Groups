import React from "react";

const UsersTable = () => (
  <table>
    <thead>
      <tr>
        <th>Group Name</th>
        <th>Description</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Math</td>
        <td>Come study math with us. We meet every Tuesday at 3pm.</td>
        <td>
          <button className="button muted-button">Edit</button>
          <button className="button muted-button">Delete</button>
        </td>
      </tr>
      <tr>
        <td>English</td>
        <td>Improve your English with us after school.</td>
        <td>
          <button className="button muted-button">Edit</button>
          <button className="button muted-button">Delete</button>
        </td>
      </tr>
      <tr>
        <td>Law</td>
        <td>If you want to study Law, you've come to the right place!</td>
        <td>
          <button className="button muted-button">Edit</button>
          <button className="button muted-button">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
);

export default UsersTable;
