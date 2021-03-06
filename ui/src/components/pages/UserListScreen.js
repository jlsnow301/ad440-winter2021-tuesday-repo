import React, { useState, useEffect } from "react";

import Button from "../uiElements/Button";
import { useAxiosClient } from "../hooks/axios-hook";

const UserListScreen = (props) => {
  const [usersList, setUsersList] = useState([]);
  const { sendRequest } = useAxiosClient();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `GET`,
          `https://nsc-func-dev-usw2-tuesday.azurewebsites.net/api/users?`,
          null,
          null
        );
        setUsersList(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <div className="homepage-header">Users Found:</div>
      <div className="divider" />
      <div className="homepage-body">
        {!usersList.length ? (
          <div>
            <br />
            Fetching users...
          </div>
        ) : (
          usersList.map((user) => {
            return (
              <Button key={user.userId} to={`users/${user.userId}`}>
                {user.email}
              </Button>
            );
          })
        )}
      </div>
    </React.Fragment>
  );
};

export default UserListScreen;
