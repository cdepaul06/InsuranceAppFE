import "./App.css";
import "devextreme/dist/css/dx.dark.css";
import { Popup, TextBox, Button } from "devextreme-react";
import { DefaultComponentConfig } from "./DevExtreme/DefaultComponentConfig";
import { useCallback, useState, useEffect } from "react";
import axios from "axios";

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
    axios
      .post("http://localhost:7263/api/login", user, {
        headers: {
          method: "POST",
          "Content-Type": "application/json",
          mode: "cors",
          body: JSON.stringify(user),
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [JSON.stringify(user)]);

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
          <Button className='w-[25%]' text='Login' onClick={handleLogin} />
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
