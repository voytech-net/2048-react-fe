import { gql } from '@apollo/client';

const GET_SCORES = gql`
    query {
        allScores(
            sortBy: score_DESC,
            where: {score_gt: 0},
            first: 10
        ) {
            id 
            score 
            player {
                name
            }
        }
    }
`;

export default GET_SCORES;
