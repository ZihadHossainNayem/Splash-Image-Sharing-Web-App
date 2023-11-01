const { authOptions } = require("@/app/api/auth/[...nextauth]/route");

const { getServerSession } = require("next-auth");

const getServerUser = async () => {
  /* getServerSession used to retrieve the user session on the server side */
  const session = await getServerSession(authOptions);
  return session?.user;
};

export default getServerUser;
