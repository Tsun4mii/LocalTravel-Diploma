import { Button, Stack, TextField } from "@mui/material";
import { Spacer } from "@nextui-org/react";
import React from "react";
import { useState } from "react";
import { postAuthRequest } from "../../utils/helpers/request.helpers";

const CommentSend = ({
  updateComments,
  routeId,
  setOpenSuccess,
  setOpenError,
  setMessage,
}) => {
  const [commentText, setCommentText] = useState("");

  const handleSend = async () => {
    try {
      const result = await postAuthRequest("/comment", {
        text: commentText,
        routeId: routeId,
      });
      if (result) {
        setMessage("Comment sended");
        setOpenSuccess(true);
        updateComments();
        return setCommentText("");
      }
    } catch (error) {
      setMessage("Error whole sending comment");
      setOpenError(true);
    }
  };
  return (
    <Stack direction="column">
      <TextField
        multiline
        rows={3}
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <Spacer y={0.5} />
      <Button
        variant="contained"
        color="secondary"
        onClick={(e) => handleSend()}
      >
        Комментировать
      </Button>
    </Stack>
  );
};

export default CommentSend;
