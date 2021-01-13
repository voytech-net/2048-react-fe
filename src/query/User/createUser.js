import { gql } from '@apollo/client';

const CREATE_USER = gql`
    mutation createUser($name:String!,$email:String!,$password:String!) {
        createUser(
            data: {
                name: $name,
                email: $email,
                password: $password   
            }
        ) {
            id
        }}
`;

export default CREATE_USER;
