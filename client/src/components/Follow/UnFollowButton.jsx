import { Button, Typography } from "@mui/material";
import { deleteAuthRequest } from "../../utils/helpers/request.helpers";

const UnFollowButton = ({ followId, updateHandler }) => {
  const handleUnFollow = async () => {
    try {
      const follow = await deleteAuthRequest(`/follow/${followId}`);
      console.log(follow);
      return updateHandler();
    } catch (error) {
      return console.log(error.message);
    }
  };
  return (
    <Button onClick={(e) => handleUnFollow()}>
      <Typography>Un follow</Typography>
    </Button>
  );
};

export default UnFollowButton;
