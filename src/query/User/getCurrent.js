import { gql } from '@apollo/client';

const GET_CURRENT = gql`
    query {
        authenticatedUser {
            id
            name
        }
    }
`;

export default GET_CURRENT;
