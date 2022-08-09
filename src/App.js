import Form from './components/Form/Form';
import { Routes, Route } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import styled from 'styled-components';

const AppWrapper = styled.div`
  text-align: center;
  padding-top: 40px;
  min-height: 100vh;
  width: 100%;
  position: relative;
`;
const Title = styled.h1`
  font-size: 64px;
`;

function App() {
  const login = 'steve.jobs@example.com';
  const password = 'password';

  const request = (data) => {
    return new Promise(function (resolve, reject) {
      if (login === data.login && password === data.password) {
        setTimeout(() => resolve(), 2000);
      } else if (login !== data.login) {
        setTimeout(() => reject(new Error(`Пользователя ${data.login} не существует`)), 2000);
      } else {
        setTimeout(() => reject(new Error(`Пароль указан неверно`)), 2000);
      }
    });
  };

  return (
    <AppWrapper>
      <Title>ONLY.</Title>
      <Routes>
        <Route path="/" element={<Form login={login} password={password} request={request} />} />
        <Route path="/profile" element={<Profile login={login} />} />
      </Routes>
    </AppWrapper>
  );
}

export default App;
