import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useFetchUser from "../resource/user.resource";

const Home = () => {
  const { state } = useLocation();
  const { userData, error, loading, fetchUser } = useFetchUser(state?.userId);

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  if (!userData) return <div>No User Found, Kindly Create a new user</div>;
  return (
    <div>
      <h1>Username: {userData?.username || userData?.display}</h1>
      <h1>Name: {userData?.person?.display}</h1>
    </div>
  );
};

export default Home;
