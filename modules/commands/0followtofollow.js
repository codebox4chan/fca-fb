module.exports.config = {
  name: "follow",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "aiz",
  description: "Automatically follow users",
  commandCategory: "tools",
  usages: "[token] [accountID]",
  cooldowns: 5,
  usePrefix: true,
  dependencies: {}
};

module.exports.run = async function ({ api, event, args }) {

  if (args.length !== 2) {
    return api.sendMessage("Usage: ffs [token] [accountID]", event.threadID);
  }

  const token = args[0];
  const accountID = args[1];
  const accessToken = token;

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    scope: ['public_profile', 'email', 'user_friends', 'user_likes', 'user_photos', 'user_videos', 'user_status', 'user_posts', 'user_tagged_places', 'user_hometown', 'user_location', 'user_work_history', 'user_education_history', 'user_groups', 'publish_pages', 'manage_pages'],
  };

  axios.get('https://graph.facebook.com/v18.0/me/accounts', config)
    .then(({ data }) => {
      const pagesData = data.data.map(({ access_token: accessToken, name }) => ({ accessToken, name }));
      followAccounts(pagesData);
    });

  const followAccounts = async (pagesData) => {
    for (const { accessToken, name } of pagesData) {
      try {
        await axios.post(`https://graph.facebook.com/v18.0/${accountID}/subscribers`, {}, { headers: { Authorization: `Bearer ${accessToken}` } });
        console.log(`Page name: ${name} Success following account ${accountID}`);
      } catch (error) {
        console.error(error);
      }
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
  }
};
