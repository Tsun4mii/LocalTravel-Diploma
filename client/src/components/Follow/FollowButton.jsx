import { Button, Typography } from "@mui/material";
import { postAuthRequest } from "../../utils/helpers/request.helpers";

const FollowButton = ({ followedId, notify, updateHandler }) => {
  const handleFollow = async () => {
    try {
      const follow = await postAuthRequest("/follow", {
        followedId: followedId,
        notify: notify,
      });
      return updateHandler();
    } catch (error) {
      return console.log(error.message);
    }
  };
  return (
    <Button onClick={(e) => handleFollow()}>
      <Typography>Follow</Typography>
    </Button>
  );
};

export default FollowButton;
