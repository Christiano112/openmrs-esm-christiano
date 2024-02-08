import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useFetchUser from '../resource/user.resource';

const Home = () => {
  const { state } = useLocation();
  const { userData, error, loading, fetchUser } = useFetchUser(state?.userId);

  console.log(state, "state from register component")

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  if (!userData) return <div>No User Found</div>;
  return (
    <div>Christiano is Home</div>
  )
}

export default Home;
