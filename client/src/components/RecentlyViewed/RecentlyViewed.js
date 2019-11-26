import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';

import Container from '@material-ui/core/Container';
import ProductCard from '../ProductCard/ProductCard';
import { Title } from '../Title/Title';
import { useStyles } from './Style';
import { dispatchGetWishlist, dispatchAddProductAndCreateWishlist } from '../../store/wishlist/actions';

const RecentlyViewed = (props) => {
  const classes = useStyles();
  const [productsList, setProductsList] = useState([]);
  let products;

  const adjustingLength = (arr) => {
    while (arr.length > 4) {
      arr.shift();
      localStorage.setItem('product', JSON.stringify(arr));
    }
  };

  const viewedProducts = JSON.parse(localStorage.getItem('product'));

  if (viewedProducts) {
    adjustingLength(viewedProducts);
  }
  const currentLocal = JSON.parse(localStorage.getItem('product'));

  useEffect(() => {
    setProductsList(currentLocal);
  }, []);

  const { user, getWishlist } = props;
  useEffect(() => {
    if (user) {
      getWishlist();
    }
  }, [user]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: true,
        },
      },
    ],
  };

  if (productsList) {
    products = productsList.map((el) => (
      <div key={el.itemNo}>
        <ProductCard
          obj={el.obj}
          className={classes.card}
          name={el.obj.name}
          itemImg={el.obj.imageUrls[0]}
          price={el.obj.price}
          url={el.obj.itemNo}
          rating={el.obj.rating}
          itemNo={el.obj.itemNo}
          wishlist={props.wishlist}
          addProductToWishlist={props.addProductToWishlist}
        />
      </div>
    ));
  } else {
    return (
      <Container maxWidth="md" className={classes.mainContainer} />
    );
  }


  return (
    <div className={classes.sectionBackground}>
      <Container maxWidth="md" className={classes.mainContainer}>
        <Title title="You recently viewed" />
        <Slider className={classes.paddingTop} {...settings}>
          {products}
        </Slider>
      </Container>
    </div>
  );
};

function putStateToProps(state) {
  return {
    wishlist: state.wishlist.wishlist,
    user: state.auth.user,
  };
}

function putActionsToProps(dispatch) {
  return {
    getWishlist: () => dispatch(dispatchGetWishlist()),
    addProductToWishlist: (url) => dispatch(dispatchAddProductAndCreateWishlist(url)),
  };
}

const RecentlyVwd = connect(putStateToProps, putActionsToProps)(RecentlyViewed);
export {
  RecentlyVwd as RecentlyViewed,
};
