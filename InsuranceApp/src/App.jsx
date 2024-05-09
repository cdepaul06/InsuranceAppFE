import "./App.css";
import "devextreme/dist/css/dx.dark.css";
import { Popup, TextBox, Button } from "devextreme-react";
import { DefaultComponentConfig } from "./DevExtreme/DefaultComponentConfig";
import { useCallback, useState } from "react";
import { apiCall } from "./API";

const App = ({}) => {
  const [user, setUser] = useState({});
  const [forgotPassword, setForgotPassword] = useState(false);
  const [newAccount, setNewAccount] = useState(false);

  const handleChange = useCallback(
    ({ value }) =>
      (field) => {
        setUser((prev) => ({ ...prev, [field]: value }));
      },
    []
  );

  const handleLogin = useCallback(() => {
    if (!user.email || !user.password) {
      return;
    }

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

  const handleNewAccount = useCallback(() => {
    apiCall("POST", "auth/register", "", user)
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
            value={user?.email}
          />
        </div>

        <div className='w-full p-2'>
          <TextBox
            label='Password *'
            mode='password'
            onValueChanged={(e) => handleChange(e)("password")}
            value={user?.password}
          />
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
            onClick={() => setNewAccount(true)}
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
            value={user?.email}
          />
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

  const renderNewAccountContent = useCallback(() => {
    return (
      <div className='flex flex-col items-center h-[100%]'>
        <div className='w-full p-2'>
          <TextBox
            label='Email *'
            onValueChanged={(e) => handleChange(e)("email")}
            value={user?.email}
          />
        </div>

        <div className='w-full p-2'>
          <TextBox
            label='Password *'
            mode='password'
            onValueChanged={(e) => handleChange(e)("password")}
            value={user?.password}
          />
        </div>

        <div className='w-full h-[100%] flex justify-center items-center'>
          <Button
            type='success'
            stylingMode='contained'
            className='w-[25%]'
            text='Register'
            onClick={handleNewAccount}
          />
        </div>
      </div>
    );
  }, []);

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

      <div>
        <Popup
          {...DefaultComponentConfig.Popup}
          title={"New Account"}
          visible={newAccount}
          contentRender={renderNewAccountContent}
        />
      </div>
    </>
  );
};

export default App;
