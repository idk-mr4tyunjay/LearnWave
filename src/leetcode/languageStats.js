export const languageStats = `
    query combinedLeetCodeStats($username: String!, $year: Int) {
        matchedUser(username: $username) {
            username
            languageProblemCount {
                languageName
                problemsSolved
            }
            submitStats {
                acSubmissionNum {
                    difficulty
                    count
                }
            }
            userCalendar(year: $year) {
                activeYears
                streak
                totalActiveDays
            }
            profile {
                ranking
            }
        }
    }
`;



    // const generateBarChart = (percent, size) => {
    //     const syms = "░▏▎▍▌▋▊▉█";
    //     const frac = Math.floor((size * 8 * percent) / 100);
    //     const barsFull = Math.floor(frac / 8);
    //     if (barsFull >= size) {
    //         return syms.substring(8, 9).repeat(size);
    //     }
    //     const semi = frac % 8;
    //     return [syms.substring(8, 9).repeat(barsFull), syms.substring(semi, semi + 1)]
    //         .join("")
    //         .padEnd(size, syms.substring(0, 1));
    // };
    
    export const formatLanguageStats = (stats, easy, medium, hard, ranking, streak, totalActiveDays) => {
        // Ensure stats array is valid before sorting
        if (!stats || stats.length === 0) return 'No language statistics available.';
    
        // Sort languages based on problems solved
        const sortedStats = stats.sort((a, b) => b.problemsSolved - a.problemsSolved);
        
        // Get top 3 languages
        const topLanguages = sortedStats.slice(0, 3);
        
        // Format the gist content
        const lines = [];
    
        // Add easy, medium, and hard stats at the top
        lines.push(`Easy: ${easy}  |  Medium: ${medium}  |  Hard: ${hard}`);
        
        // Add top languages with dots and solved counts
        topLanguages.forEach((lang, index) => {
            lines.push(`${index + 1}. ${lang.languageName} ................ ${lang.problemsSolved}`);
        });
    
        // Add ranking, streak, and total active days at the bottom
        lines.push(`Rank: ${ranking}  |  Streak: ${streak}  |  Active Days: ${totalActiveDays}`);
    
        return lines.join('\n');
    };
    