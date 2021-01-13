import { gql } from '@apollo/client';

const PROCESS_GAME = gql`
    mutation processGame($state:[[Int!]!]!,$score:Int!,$direction:Direction!) {
        processGame(
            game: {
                state: $state,
                score: $score,
                direction: $direction
            }
        ) {
            state, 
            score, 
            finished
        }}
`;

export default PROCESS_GAME;
