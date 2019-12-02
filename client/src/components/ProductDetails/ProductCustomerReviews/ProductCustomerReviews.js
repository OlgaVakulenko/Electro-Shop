import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import { addComment, getComments } from '../../../store/comments/actions';

import { useStyles } from './style';

const mapStateToProps = (store) => ({
  comments: store.commentsReducer.comments,
});

const ProductCustomerReviews = ({
  // eslint-disable-next-line no-shadow
  user, obj, addComment, getComments, comments,
}) => {
  const [value, setValue] = useState(0);

  const [comment, setComment] = useState({
    product: '',
    content: '',
    rating: 0,
  });

  const classes = useStyles();

  const renderComments = (arr) => arr.map((el, i) => (
    <Box
      className={classes.commentItem}
      key={i}
    >
      <div className={classes.commentTitle}>
        <div className={classes.customerName}>
          {el.customer.login}
        </div>
        <div className={classes.commentDate}>
          {el.customer.date.slice(0, 10)}
        </div>
      </div>
      <Rating
        name="read-only"
        value={+el.rating}
        precision={0.5}
        readOnly
        size="small"
      />
      <div className={classes.commentDesc}>
        {el.content}
      </div>
    </Box>
  ));

  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    if (obj._id) {
      setComment(() => ({
        ...comment,
        // eslint-disable-next-line no-underscore-dangle
        product: obj._id,
      }));
      // eslint-disable-next-line no-underscore-dangle
      getComments(obj._id);
    }
    // eslint-disable-next-line
  }, [obj]);

  return (
    <Box className={classes.reviewsMainBox}>
      <Typography className={classes.reviewsHeader}>
        CUSTOMER REVIEWS (
        {comments.length}
        )
      </Typography>
      <Box
        className={classes.userReview}
        style={
          user ? { display: 'block' } : { display: 'none' }
        }
      >
        <TextField
          multiline
          rows="4"
          placeholder="Your review"
          className={classes.userComment}
          margin="normal"
          variant="outlined"
          onChange={(e) => {
            setComment({
              ...comment,
              content: e.target.value,
            });
          }}
        />
        <Rating
          name="simple-controlled"
          value={value}
          size="large"
          onChange={(e, newValue) => {
            setComment(() => ({
              ...comment,
              rating: e.target.value,
            }));
            setValue(newValue);
          }}
        />
        <Button
          className={classes.addReview}
          /* eslint-disable-next-line no-underscore-dangle */
          onClick={() => {
            addComment(comment);
          }}
        >
          Add a review
        </Button>
      </Box>
      { comments.length !== 0 ? renderComments(comments) : null }
    </Box>
  );
};

export default connect(mapStateToProps, { addComment, getComments })(ProductCustomerReviews);
