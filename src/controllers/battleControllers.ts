import { updateFighter } from "../repositories/userRepository";
import countStargazers from "../services/countStargazers";

export async function clashUsers(req, res) {
    const users = req.body
    const firstUser = res.locals.firstUser;
    const secondUser = res.locals.secondUser;

    const stargazersFirst = countStargazers(firstUser);
    const stargazersSecond = countStargazers(secondUser);

    try {
        if (stargazersFirst > stargazersSecond) {
            await updateFighter(users.firstUser, 'win');
            await updateFighter(users.secondUser, 'loss');

            res.status(200).send({
                winner: firstUser,
                loser: secondUser,
                draw: false
            });
        } else if (stargazersFirst < stargazersSecond) {
            await updateFighter(users.firstUser, 'loss');
            await updateFighter(users.secondUser, 'win');

            res.status(200).send({
                winner: secondUser,
                loser: firstUser,
                draw: false
            });
        } else {
            await updateFighter(users.firstUser, 'draw');
            await updateFighter(users.secondUser, 'draw');

            res.status(200).send({
                winner: null,
                loser: null,
                draw: true
            });
        }
    } catch (err) {
        res.status(500).send("On clashUsers: " + err);
    }
}