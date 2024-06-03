import "./App.css";
import "devextreme/dist/css/dx.dark.css";
import { Popup, TextBox, Button } from "devextreme-react";
import { DefaultComponentConfig } from "./DevExtreme/DefaultComponentConfig";
import Validator, { RequiredRule, EmailRule } from "devextreme-react/validator";
import { useCallback, useEffect, useState } from "react";
import { apiCall } from "./API";
import { useNavigate } from "react-router-dom";
import { UserTypes } from "./Constants/UserTypes";

const App = ({}) => {
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleChange = useCallback(
    ({ value }) =>
      (field) => {
        setUser((prev) => ({ ...prev, [field]: value }));
      },
    []
  );

  const handleLogin = useCallback(
    (e) => {
      apiCall("POST", "auth/login", e.validationGroup, "", user)
        .then((res) => {
          if (res) {
            if (res.userTypeId === UserTypes.ADMIN) {
              navigate("/admin");
            }

            if (res.userTypeId === UserTypes.USER) {
              navigate("/user");
            }
            setOpen(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [user]
  );

  const renderContent = useCallback(() => {
    return (
      <div className='flex flex-col items-center h-[100%]'>
        <div className='w-full p-2'>
          <TextBox
            {...DefaultComponentConfig.TextBox}
            label='Email *'
            onValueChanged={(e) => handleChange(e)("email")}
            value={user?.email}
          >
            <Validator>
              <RequiredRule message='Email is required' />
              <EmailRule message='Invalid email address' />
            </Validator>
          </TextBox>
        </div>

        <div className='w-full p-2'>
          <TextBox
            {...DefaultComponentConfig.TextBox}
            label='Password *'
            mode='password'
            onValueChanged={(e) => handleChange(e)("password")}
            value={user?.password}
          >
            <Validator>
              <RequiredRule message='Password is required' />
            </Validator>
          </TextBox>
        </div>

        <div className='w-full h-[100%] flex justify-center items-center'>
          <Button
            {...DefaultComponentConfig.Button}
            type='success'
            stylingMode='contained'
            className='w-[25%]'
            text='Login'
            onClick={handleLogin}
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
          visible={open}
          contentRender={renderContent}
        />
      </div>
    </>
  );
};

export default App;
