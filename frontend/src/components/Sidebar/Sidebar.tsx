import React, { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUsers, Users } from '../../store/chatSlice';

const Sidebar = () => {
    const AllUsers = useAppSelector(Users);
    const dispatch = useAppDispatch();

    const UsersGet = useCallback(async() => {
        await dispatch(getUsers());
    }, [dispatch]);

    useEffect(() => {
        UsersGet().catch(console.error)
    }, [UsersGet]);

    const createCard = AllUsers.map((element) => {
        return <div key={element._id} style={{margin: '10px'}}>
            <b>{element.displayName}</b>
        </div>
    })

    return (
        <div style={{border: '1px solid black', marginRight: '15px'}}>
            {createCard}
        </div>
    );
};

export default Sidebar;