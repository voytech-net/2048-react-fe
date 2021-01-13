import { gql } from '@apollo/client';

const UNAUTHENTICATE_USER = gql`
    mutation unauthenticateUser {
        unauthenticateUser {
            success
        }}
`;

export default UNAUTHENTICATE_USER;
