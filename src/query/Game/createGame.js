import { gql } from '@apollo/client';

const NEW_GAME = gql`
    query {
        newGame {
            state, 
            score, 
            finished
        }}
`;

export default NEW_GAME;
