import { gql } from '@apollo/client';

const AUTHENTICATE_USER = gql`
    mutation authenticateUserWithPassword($email:String!,$password:String!) {
        authenticateUserWithPassword(
            email: $email,
            password: $password
        ) {
            token
        }}
`;

export default AUTHENTICATE_USER;
