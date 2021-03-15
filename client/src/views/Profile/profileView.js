import React from "react";
import { AuthContext } from "../../routes/index";
function ProfileView() {
  const { state: authState } = React.useContext(AuthContext);

  return (
    <div>
      <h1>Profile</h1>
      <span>{authState.user.name}</span>
      <span>{JSON.stringify(authState, undefined, 2)}</span>
    </div>
  );
}

export default ProfileView;
