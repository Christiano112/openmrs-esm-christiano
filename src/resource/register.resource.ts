import { useState } from "react";

export interface RequestData {
  username: string;
  password: string;
  person: {
    names: { givenName: string; familyName: string }[];
    gender: string;
    birthdate: string;
    addresses: {
      address1: string;
      cityVillage: string;
      country: string;
      postalCode: string;
    }[];
  };
  roles: { name: string; description: string }[];
  systemId: string;
}

const useRegisterUser = () => {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (requestData: RequestData) => {
    setLoading(true);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Basic YWRtaW46QWRtaW4xMjM=");
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Cookie", "JSESSIONID=DF385B2E6E39E0BB49BB7E079BF31C44");

      const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(requestData),
        redirect: "follow",
      };

      const response = await fetch("/openmrs/ws/rest/v1/user", requestOptions);
      const result = await response.text();
      return JSON.parse(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, fetchData };
};

export default useRegisterUser;
