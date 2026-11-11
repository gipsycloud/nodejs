// import fetch from 'node-fetch';
// const fetch = require('node-fetch');
const fetch = globalThis.fetch;

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

interface ContributionDay {
  date: string;
  contributionCount: number;
}

interface RepositoryContribution {
  repository: { nameWithOwner: string };
  contributions: { totalCount: number };
}

interface Contributions {
  contributionCalendar: {
    totalContributions: number;
    weeks: Array<{ contributionDays: ContributionDay[] }>;
  };
  commitContributionsByRepository: RepositoryContribution[];
}

async function fetchContributions(
  username: string | undefined,
  token?: string
): Promise<{ contributions: Contributions; commitContributions: RepositoryContribution[] } | null> {
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
    const data = await response.json() as {
      errors?: Array<{ message: string }>;
      data: { user: { contributionsCollection: Contributions } };
    };
    if (data.errors) {
      throw new Error(data.errors.map(e => e.message).join(', '));
    }
    return {
      contributions: data.data.user.contributionsCollection,
      commitContributions: data.data.user.contributionsCollection.commitContributionsByRepository,
    }
  } catch (error) {
    console.error('Error fetching contributions:', error);
    return null;
  }
}

export { fetchContributions };