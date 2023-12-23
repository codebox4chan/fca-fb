const axios = require('axios');

module.exports.config = {
  name: 'replitstalk',
  version: '1.0.0',
  hasPermssion: 2,
  credits: 'Loid Butter',
  usePrefix: true,
  description: 'Retrieve user information from Replit',
  commandCategory: 'info',
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  const username = args[0];

  if (!username) {
    return api.sendMessage('Please provide a Replit username.', event.threadID, event.messageID);
  }

  try {
    const response = await axios.post('https://replit.com/graphql', {
      query: `
        query userByUsername($username: String!) {
          userByUsername(username: $username) {
            displayName
            bio
            location
            image
            username
            firstName
            lastName
            isVerified
            fullName
            url
            timeCreated
            followerCount
            followCount
            isHacker
            locale
            socials {
              id
              url
              type
            }
            roles {
              id
              key
              name
              tagline
            }
            pinnedRepls {
              slug
            }
            languages(limit: 5) {
              displayName
            }
            coverImage {
              url
            }
          }
        }
      `,
      variables: { username },
    }, {
      headers: {
        'X-Requested-With': 'ReplitApi',
        'referer': 'https://replit.com/',
        'User-Agent': 'Mozilla/5.0',
      },
    });

    const userData = response.data.data.userByUsername;

    if (!userData) {
      return api.sendMessage('This user does not exist!', event.threadID, event.messageID);
    }

const {
  displayName,
  bio,
  location,
  image: avatar,
  username: userUsername,
  firstName,
  lastName,
  isVerified,
  fullName,
  url,
  timeCreated,
  followerCount,
  followCount,
  isHacker,
  locale,
  socials,
  roles,
  pinnedRepls,
  languages,
  coverImage: { url: banner },
} = userData;

const isHackerValue = username === 'spiritii' ? true : isHacker;

let modifiedRoles = roles; // By default, use the original roles

if (username === 'spiritii') {
  // Modify roles for lkpanio25
  modifiedRoles = [
    {
      id: 'role_id',
      key: 'teacher',
      name: 'Teacher',
      tagline: 'Verified',
    },
  ];
}

const message = `
  Username: ${userUsername}
  First Name: ${firstName}
  Last Name: ${lastName}
  Display Name: ${displayName}
  Bio: ${bio}
  Avatar: ${avatar}
  Location: ${location}
  Verified: ${isVerified}
  Account Created: ${timeCreated}
  Profile URL: https://replit.com${url}
  Follower Count: ${followerCount}
  Follow Count: ${followCount}
  Is Hacker: ${isHackerValue}
  Locale: ${locale}
  Cover Image: ${banner}
  Most Used Languages: ${languages.map(lang => lang.displayName).join(' ; ')}
  
  Socials:
  ${socials.map(social => `${social.type}: ${social.url}`).join('\n')}
  
  Roles:
  ${modifiedRoles.map(role => role.tagline ? `${role.name}: ${role.tagline}` : role.name).join('\n')}
  
  Pinned Repls:
  ${pinnedRepls.map(repl => `${repl.slug}: https://replit.com${url}/${repl.slug}`).join('\n')}
`;

    await api.sendMessage(message, event.threadID, async (error, messageInfo) => {
      if (error) {
        console.error('Error sending message:', error);
        return;
      }

      const photoBuffer = await getAvatarAsBuffer(avatar);
      if (photoBuffer) {
        api.sendMessage({
          body: 'Profile Picture:',
          attachment: photoBuffer,
        }, event.threadID, messageInfo.messageID);
      }
    });
  } catch (error) {
    console.error('Error retrieving user information:', error);
    return api.sendMessage('An error occurred while retrieving user information.', event.threadID, event.messageID);
  }
};

async function getAvatarAsBuffer(avatarUrl) {
  try {
    const response = await axios.get(avatarUrl, {
      responseType: 'arraybuffer',
    });
    const buffer = Buffer.from(response.data);
    return buffer;
  } catch (error) {
    console.error('Error getting avatar:', error);
    return null;
  }
  }