import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '~/app/hooks';
import { login } from '~/features/auth/authThunk';

function Login() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('haidangke');
    const [password, setPassword] = useState('Haidangker12345');

    const handleLogin = () => {
        dispatch(login({ username, password }))
            .unwrap()
            .then(() => {
                navigate('/');
                window.location.reload();
            })
            .catch(() => {});
    };

    return (
        <>
            <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Username"
            />
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="text"
                placeholder="Password"
            />
            <button onClick={handleLogin}>Login</button>
        </>
    );
}

export default Login;
