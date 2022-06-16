import React from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { logout } from 'app/thunk/authThunk';

function Home() {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);

    return (
        <div>
            <div>Username: {user?.username}</div>
            <div>Email: {user?.email}</div>
            <button onClick={() => dispatch(logout())}>Logout</button>
        </div>
    );
}

export default Home;
