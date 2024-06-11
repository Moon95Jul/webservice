import { useState } from 'react';
import axios from 'axios';

function LoginForm(props) {
    const { styleData, setIsLoggedIn, setName } = props;

    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');
    
    const onClickBtn = async() => {
        try {
            const response = await axios.post('http://localhost:3000/token/login', { id, pwd, name });
            const { token, userName } = response.data;
            localStorage.setItem('jwt', token);
            setName(userName);
            setIsLoggedIn(true);
            alert('로그인 성공! 토큰이 저장되었습니다.');
          } catch (error) {
            console.log(error);
            alert('로그인 실패: ' + error);
          }
    }
    
    
    console.log('Login render, ${id}, ${pwd}')
    return (
      <div style={styleData}>
          <div>
              <h2>Login</h2>
              <input
                type="text"
                placeholder="ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
              />
              <button onClick={onClickBtn}>로그인 하기</button>
            </div>
      </div>
          );
  }
  
  export default LoginForm;