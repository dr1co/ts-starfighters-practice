export default function countStargazers(user) {
    let num: number = 0;

    for (let i = 0 ; i < user.length ; i++) {
        num += user[i].stargazers_count;
    }

    return num;
}