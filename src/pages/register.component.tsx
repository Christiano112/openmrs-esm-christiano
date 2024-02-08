import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const { v4: uuidv4 } = require('uuid');
import { TextInput, Button, RadioButtonGroup, RadioButton } from '@carbon/react';
import useRegisterUser, { type RequestData } from '../resource/register.resource';

const Register = () => {
  const id = uuidv4();
  const defaultFormValues = {
    username: '',
    password: '',
    person: {
      names: [{ givenName: '', familyName: '' }],
      gender: '',
      birthdate: '',
      addresses: [{ address1: '', cityVillage: '', country: '', postalCode: '' }],
    },
    roles: [{ name: '', description: '' }],
    systemId: id,
  };

  const navigate = useNavigate();
  const { data, error, loading, fetchData } = useRegisterUser();
  const [formValues, setFormValues] = useState<RequestData>(defaultFormValues);

  const handleRegisterUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const res = await fetchData(formValues);
      console.log(res, "response from server");
      navigate('/', { state: { userId: id } });
    } catch (error) {
      console.error(error, "fetching error");
    }
  }

  if (error) {
    return <h1>Error Registering Users, Check Network Tab for More Info</h1>;
  }

  return (
    <section>
      <form onSubmit={handleRegisterUser}>
        <TextInput
          id="username"
          type="text"
          labelText="Username"
          value={formValues.username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormValues({ ...formValues, username: e.target.value })}
        />
        <TextInput
          id="password"
          type="password"
          labelText="Password"
          value={formValues.password}
          autoComplete="new-password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormValues({ ...formValues, password: e.target.value })}
        />
        <TextInput
          id="givenName"
          type="text"
          labelText="Given Name"
          value={formValues.person.names[0].givenName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormValues({ ...formValues, person: { ...formValues.person, names: [{ ...formValues.person.names[0], givenName: e.target.value }] } })}
        />
        <TextInput
          id="familyName"
          type="text"
          labelText="Family Name"
          value={formValues.person.names[0].familyName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormValues({ ...formValues, person: { ...formValues.person, names: [{ ...formValues.person.names[0], familyName: e.target.value }] } })}
        />
        <RadioButtonGroup name="radio-button-group" defaultSelected="male" legendText="Select Gender"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormValues({
            ...formValues, person: {
              ...formValues.person

            }
          })}
          value={formValues.person.gender}>
          <RadioButton value="male" id="male" labelText="Male" />
          <RadioButton value="female" id="female" labelText="Female" />
        </RadioButtonGroup>
        <TextInput
          id="birthdate"
          type="date"
          labelText="Birthdate"
          value={formValues.person.birthdate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormValues({ ...formValues, person: { ...formValues.person, birthdate: e.target.value } })}
        />
        <TextInput
          id="address1"
          type="text"
          labelText="Address"
          value={formValues.person.addresses[0].address1}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormValues({ ...formValues, person: { ...formValues.person, addresses: [{ ...formValues.person.addresses[0], address1: e.target.value }] } })}
        />
        <TextInput
          id="cityVillage"
          type="text"
          labelText="City/Village"
          value={formValues.person.addresses[0].cityVillage}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormValues({ ...formValues, person: { ...formValues.person, addresses: [{ ...formValues.person.addresses[0], cityVillage: e.target.value }] } })}
        />
        <TextInput
          id="country"
          type="text"
          labelText="Country"
          value={formValues.person.addresses[0].country}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormValues({ ...formValues, person: { ...formValues.person, addresses: [{ ...formValues.person.addresses[0], country: e.target.value }] } })}
        />
        <TextInput
          id="postalCode"
          type="text"
          labelText="Postal Code"
          value={formValues.person.addresses[0].postalCode}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormValues({ ...formValues, person: { ...formValues.person, addresses: [{ ...formValues.person.addresses[0], postalCode: e.target.value }] } })}
        />
        <TextInput
          id="role"
          type="text"
          labelText="Role"
          value={formValues.roles[0].name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormValues({ ...formValues, roles: [{ ...formValues.roles[0], name: e.target.value }] })}
        />
        <TextInput
          id="description"
          type="text"
          labelText="Description"
          value={formValues.roles[0].description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormValues({ ...formValues, roles: [{ ...formValues.roles[0], description: e.target.value }] })}
        />
        <Button type="submit" className="submit-btn">
          {loading ? "Loading..." : "Submit"}
        </Button>
      </form>
    </section>
  )
}

export default Register;
