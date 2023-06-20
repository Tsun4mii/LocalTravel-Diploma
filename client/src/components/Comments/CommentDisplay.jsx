import { ListItem, ListItemText, Typography } from "@mui/material";
import { Card } from "@nextui-org/react";
import React from "react";

const CommentDisplay = ({ comment }) => {
  return (
    <ListItem>
      <Card>
        <Card.Body>
          <ListItemText
            secondary={
              <>
                <Typography>{comment.user.username}</Typography>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {comment.text}
                </Typography>
              </>
            }
          />
        </Card.Body>
      </Card>
    </ListItem>
  );
};

export default CommentDisplay;
