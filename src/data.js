import api from "./api";

function getSavedUsers() {
  return JSON.parse(localStorage.getItem("users"));
}

function saveUsers(users) {
  return localStorage.setItem("users", JSON.stringify(users));
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export async function getData() {
  //  memoize the users so we don't do crazy calls to server (it has a limit)
  const savedUsers = getSavedUsers();
  if (savedUsers) {
    // let's fake a timer so it looks like it's a request
    await sleep(1000);
    return savedUsers;
  }

  const { data } = await api.get("/user");
  const users = data?.data;
  // we need the full profile because we want the email
  const userPromises = users.map(async ({ id }) => {
    const statusChance = Math.random();
    const { data: user } = await api.get(`/user/${id}`);
    return {
      ...user,
      status:
        statusChance > 0.5 ? `Expiring in ${22} days` : "Actively insured",
    };
  });
  const fullUsers = await Promise.all(userPromises);
  saveUsers(fullUsers);
  return fullUsers;
}
