import { useState } from "react";

const useFetchUser = (uuid: string) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    if (!uuid) return;
    setLoading(true);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Basic YWRtaW46QWRtaW4xMjM=");
      myHeaders.append("Cookie", "JSESSIONID=DF385B2E6E39E0BB49BB7E079BF31C44");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow" as RequestRedirect,
      };

      const response = await fetch(
        `/openmrs/ws/rest/v1/user/${uuid}`,
        requestOptions
      );
      const result = await response.text();
      const resultJson = await JSON.parse(result);
      setUserData(resultJson);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { userData, error, loading, fetchUser };
};

export default useFetchUser;
