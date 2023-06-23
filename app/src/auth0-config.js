import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderConfig = ({ children }) => {
    console.log(process.env.REACT_APP_CLIENT_ID)
    const domain = process.env.REACT_APP_BASE_URL
    const clientId = process.env.REACT_APP_CLIENT_ID;

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            redirectUri={window.location.origin +'/callback'}
        >
            {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderConfig;
