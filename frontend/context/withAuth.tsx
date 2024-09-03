import jwt from 'jsonwebtoken';
import axios from 'axios';
import https from 'https';
import Cookies from 'cookies';


import { JWT_KEY } from '@/config/';

const withAuth = (getServerSidePropsFunc) => {
    return async (context) => {
        const cookies = new Cookies(context.req, context.res);

        try {
            // Extract the JWT from cookies
            const userJWT = context.req.headers.cookie?.replace(/(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/, '$1');

            // If JWT is not present, trigger logout
            if (!userJWT) {
                cookies.set('jwt', '', { path: '/', maxAge: -1 });
                cookies.set('userName', '', { path: '/', maxAge: -1 });
                return {
                    redirect: {
                        destination: '/Login',
                        permanent: false,
                    },
                };
            }

            const secretKey = JWT_KEY;
            let decodedToken;

            // Verify the JWT
            try {
                decodedToken = jwt.verify(userJWT, secretKey);
            } catch (err) {
                console.log(err.message);
                if(err.message == "jwt expired") {
                    console.log(cookies.get("jwt"));
                    console.log(cookies.get("userName"));

                    cookies.set('jwt', '', { path: '/', maxAge: -1 });
                    cookies.set('userName', '', { path: '/', maxAge: -1 });

                    console.log(cookies.get("jwt"));
                    console.log(cookies.get("userName"));

                    return {
                        redirect: {
                            destination: '/Login',
                            permanent: false,
                        },
                    };
                }
            }

            // If the token is valid, proceed with the original getServerSideProps
            const props = await getServerSidePropsFunc(context, decodedToken);
            return props;

        } catch (error) {
            console.error('Error in getServerSideProps:', error.message);

            return {
                props: {
                    data: null,
                },
            };
        }
    };
};

export default withAuth;