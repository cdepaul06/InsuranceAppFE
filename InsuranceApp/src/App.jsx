import "./App.css";
import "devextreme/dist/css/dx.dark.css";
import { Popup, TextBox, Button } from "devextreme-react";
import { DefaultComponentConfig } from "./DevExtreme/DefaultComponentConfig";
import Validator, { RequiredRule } from "devextreme-react/validator";
import { useCallback, useState } from "react";
import { apiCall } from "./API";

const App = ({}) => {
  const [user, setUser] = useState({});
  const [forgotPassword, setForgotPassword] = useState(false);

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

  const handleForgotPassword = useCallback(() => {
    apiCall("POST", "auth/forgot-password", "", user)
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
            label='Email *'
            onValueChanged={(e) => handleChange(e)("email")}
          >
            <Validator>
              <RequiredRule message='Email is required' />
            </Validator>
          </TextBox>
        </div>

        <div className='w-full p-2'>
          <TextBox
            label='Password *'
            mode='password'
            onValueChanged={(e) => handleChange(e)("password")}
          >
            <Validator>
              <RequiredRule message='Password is required' />
            </Validator>
          </TextBox>
        </div>

        <div className='w-full h-[100%] flex justify-center items-center'>
          <Button
            type='success'
            stylingMode='contained'
            className='w-[25%]'
            text='Login'
            onClick={handleLogin}
          />
        </div>

        <div className='w-full h-[100%] flex justify-between items-center'>
          <Button
            className='w-[33%]'
            stylingMode='text'
            text='New Account'
            onClick={() => console.log("Register")}
          />

          <Button
            className='w-[33%]'
            stylingMode='text'
            text='Forgot Password'
            onClick={() => setForgotPassword(true)}
          />
        </div>
      </div>
    );
  }, []);

  const renderForgotPasswordContent = useCallback(() => {
    return (
      <div className='flex flex-col items-center h-[100%]'>
        <div className='w-full p-2'>
          <TextBox
            label='Email'
            onValueChanged={(e) => handleChange(e)("email")}
          >
            <Validator>
              <RequiredRule message='Email is required' />
            </Validator>
          </TextBox>
        </div>

        <div className='w-full h-[100%] flex justify-center items-center'>
          <Button
            type='success'
            stylingMode='contained'
            className='w-[25%]'
            text='Send'
            onClick={handleForgotPassword}
          />
        </div>
      </div>
    );
  }, [user]);

  return (
    <>
      <div>
        <Popup
          {...DefaultComponentConfig.Popup}
          title={"Login"}
          visible={true}
          contentRender={renderContent}
        />
      </div>

      <div>
        <Popup
          {...DefaultComponentConfig.Popup}
          title={"Forgot Password"}
          visible={forgotPassword}
          contentRender={renderForgotPasswordContent}
          onHiding={() => setForgotPassword(false)}
        />
      </div>
    </>
  );
};

export default App;
