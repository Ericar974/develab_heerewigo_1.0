import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AuthCallback = () => {
    const { isLoading, error } = useAuth0();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error : {error.message}</div>;
    }

    return <div>Redirection...</div>;
};

export default AuthCallback;
