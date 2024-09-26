import 'dotenv/config';
import { Octokit } from '@octokit/rest';
import { getLeetCodeStats } from './src/leetcode.js';
import { formatLanguageStats } from './src/leetcode/languageStats.js';

const {
    GH_TOKEN: github_token,
    GIST_ID: gist_id,
    LEETCODE_USERNAME: leetcode_username
} = process.env;

const octokit = new Octokit({
    auth: `token ${github_token}`
});

async function main() {
    const leetCodeStats = await getLeetCodeStats(leetcode_username);
    if (leetCodeStats) {
        const { languageStats, easy, medium, hard, ranking, streak, totalActiveDays } = leetCodeStats;
        const formattedContent = formatLanguageStats(languageStats, easy, medium, hard, ranking, streak, totalActiveDays);
        await updateGist(formattedContent);
    }
}

async function updateGist(content) {
    let gist;
    try {
        gist = await octokit.gists.get({ gist_id });
    } catch (error) {
        console.error(`Error fetching Gist: ${error}`);
        return;
    }

    const filename = Object.keys(gist.data.files)[0];

    try {
        await octokit.gists.update({
            gist_id,
            files: {
                [filename]: {
                    filename: `💻 My LeetCode Stats ✨`,
                    content
                }
            }
        });
    } catch (error) {
        console.error(`Error updating Gist: ${error}`);
    }
}

main();
