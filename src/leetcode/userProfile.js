export const formatLeetCodeData = (leetcode) => {
    const lines = [];
    const title = [
        "Difficulty".padEnd(10),
        "Solved".padEnd(9),
        "Accepted Rate".padEnd(8)
    ];
    lines.push(title.join(" "));

    for (const { difficulty, acceptedRate, solvedRadio } of leetcode.solved) {
        const line = [
            difficulty.padEnd(10),
            solvedRadio.padEnd(9),
            generateBarChart(acceptedRate, 20),
            String(acceptedRate.toFixed(1)).padStart(5) + "%"
        ];
        lines.push(line.join(" "));
    }

    return lines.join("\n");
};

function generateBarChart(percent, size) {
    const syms = "░▏▎▍▌▋▊▉█";
    const frac = Math.floor((size * 8 * percent) / 100);
    const barsFull = Math.floor(frac / 8);
    if (barsFull >= size) {
        return syms.substring(8, 9).repeat(size);
    }
    const semi = frac % 8;
    return [syms.substring(8, 9).repeat(barsFull), syms.substring(semi, semi + 1)]
        .join("")
        .padEnd(size, syms.substring(0, 1));
}


export const userProfile = `
    query getUserProfile($username: String!) {
        allQuestionsCount {
            difficulty
            count
        }
        matchedUser(username: $username) {
            username
            submitStats: submitStatsGlobal {
                acSubmissionNum {
                    difficulty
                    count
                    submissions
                }
                totalSubmissionNum {
                    difficulty
                    count
                    submissions
                }
            }
        }
    }`;

