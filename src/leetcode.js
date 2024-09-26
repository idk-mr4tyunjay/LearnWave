import axios from "axios";
import { languageStats as query } from "./leetcode/languageStats.js";

const LEETCODE_URL = "https://leetcode.com/graphql";

export const getLeetCodeStats = async (username) => {
  try {
    const response = await axios.post(
      LEETCODE_URL,
      {
        query,
        variables: { username },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Referer: "https://leetcode.com/",
        },
      }
    );

    // Log the response to inspect the structure
    console.log(
      "LeetCode API response:",
      JSON.stringify(response.data, null, 2)
    );

    const data = response.data.data.matchedUser;

    // Extract relevant stats
    const languageStats = data.languageProblemCount || [];
    const submissionStats = data.submitStats.acSubmissionNum || [];

    // Extract problem counts for easy, medium, and hard difficulties
    const easy =
      submissionStats.find((d) => d.difficulty === "Easy")?.count || 0;
    const medium =
      submissionStats.find((d) => d.difficulty === "Medium")?.count || 0;
    const hard =
      submissionStats.find((d) => d.difficulty === "Hard")?.count || 0;
    // Extract ranking, streak, and total active days
    const ranking = data.profile.ranking || 0;
    const streak = data.userCalendar.streak || 0;
    const totalActiveDays = data.userCalendar.totalActiveDays || 0;
    // Return the necessary stats to format
    return {
      languageStats,
      easy,
      medium,
      hard,
      ranking,
      streak,
      totalActiveDays,
    };
  } catch (error) {
    console.error("Error fetching LeetCode stats:", error);
    return null;
  }
};
