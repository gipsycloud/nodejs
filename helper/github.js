// import fetch from 'node-fetch';
// const fetch = require('node-fetch');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const query = `
  query($userName: String!) {
    user(login: $userName) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
        commitContributionsByRepository {
          repository {
            nameWithOwner
          }
          contributions {
            totalCount
          }
        }
      }
    }
  }
`;

async function fetchContributions(username, token) {
  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { userName: username },
      }),
    });
    const data = await response.json();
    if (data.errors) {
      throw new Error(data.errors.map(e => e.message).join(', '));
    }
    return data.data.user.contributionsCollection;
  } catch (error) {
    console.error('Error fetching contributions:', error);
    return null;
  }
}

export default { fetchContributions }; // export the fetchContributions function