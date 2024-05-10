import "./App.css";
import "devextreme/dist/css/dx.dark.css";
import { Popup, TextBox, Button } from "devextreme-react";
import { DefaultComponentConfig } from "./DevExtreme/DefaultComponentConfig";
import Validator, {
  RequiredRule,
  CompareRule,
} from "devextreme-react/validator";
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

  const handleLogin = useCallback(
    (e) => {
      console.log("### e", e);
      let result = e.validationGroup.validate();
      if (result.isValid) {
        apiCall("POST", "auth/login", "", user)
          .then((res) => {
            if (res) {
              console.log(res);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
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
          visible={true}
          contentRender={renderContent}
          onHiding={() => {
            setForgotPassword(false);
            setUser({});
          }}
        />
      </div>
    </>
  );
};

export default App;
