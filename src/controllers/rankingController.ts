import { orderRanking } from "../repositories/userRepository";

export async function getRanking(req, res) {
    try {
        const { rows: fighters } = await orderRanking();

        res.status(200).send({
            fighters
        });
    } catch (err) {
        res.status(500).send("On getRanking: " + err);
    }
}