import "./App.css";
import "devextreme/dist/css/dx.dark.css";
import { Popup, TextBox, Button } from "devextreme-react";
import { DefaultComponentConfig } from "./DevExtreme/DefaultComponentConfig";
import { useCallback, useState } from "react";
import { apiCall } from "./API";

const App = ({}) => {
  const [user, setUser] = useState({});

  const handleChange = useCallback(
    ({ value }) =>
      (field) => {
        setUser((prev) => ({ ...prev, [field]: value }));
      },
    []
  );

  const handleLogin = useCallback(() => {
    apiCall("POST", "auth/login", "", user)
      .then((res) => {
        if (res) {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  const renderContent = useCallback(() => {
    return (
      <div className='flex flex-col items-center h-[100%]'>
        <div className='w-full p-2'>
          <TextBox
            label='Email'
            onValueChanged={(e) => handleChange(e)("email")}
          />
        </div>

        <div className='w-full p-2'>
          <TextBox
            label='Password'
            mode='password'
            onValueChanged={(e) => handleChange(e)("password")}
          />
        </div>

        <div className='w-full h-[100%] flex justify-center items-center'>
          <Button
            type='normal'
            stylingMode='contained'
            className='w-[25%]'
            text='Login'
            onClick={handleLogin}
          />
        </div>

        <div className='w-full h-[100%] flex justify-between items-center'>
          <Button
            className='w-[33%]'
            stylingMode='outlined'
            text='Create'
            onClick={() => console.log("Register")}
          />

          <Button
            className='w-[33%]'
            stylingMode='outlined'
            text='Forgot Password'
            onClick={() => console.log("Forgot Password")}
          />
        </div>
      </div>
    );
  }, []);

  return (
    <div>
      <Popup
        {...DefaultComponentConfig.Popup}
        title={"Login"}
        visible={true}
        contentRender={renderContent}
      />
    </div>
  );
};

export default App;
