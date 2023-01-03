import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Timer from "../Timer";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import Fade from "react-reveal/Fade";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const NewItems = () => {
  const [items, setItems] = useState([]);

  async function fetchItems() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );

    setItems(data);
  }
  useEffect(() => {
    setTimeout(() => {
      fetchItems();
    }, 2000);
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Fade right>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              navigation={true}
              centerInsufficientSlides
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
              }}
              modules={[Navigation]}
              className="mySwiper"
            >
              {items.length ? (
                items?.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div key={item.id}>
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Link
                            to={`/author/${item.authorId}`}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Creator: Monica Lucas"
                          >
                            <img
                              className="lazy w-[100px]"
                              src={item.authorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="de_countdown">
                          <Timer expirationDate={item.expiryDate} />
                        </div>

                        <div className="nft__item_wrap">
                          <div className="nft__item_extra">
                            <div className="nft__item_buttons">
                              <button>Buy Now</button>
                              <div className="nft__item_share">
                                <h4>Share</h4>
                                <a href="" target="_blank" rel="noreferrer">
                                  <i className="fa fa-facebook fa-lg"></i>
                                </a>
                                <a href="" target="_blank" rel="noreferrer">
                                  <i className="fa fa-twitter fa-lg"></i>
                                </a>
                                <a href="">
                                  <i className="fa fa-envelope fa-lg"></i>
                                </a>
                              </div>
                            </div>
                          </div>

                          <Link to={`/item-details/${item.nftId}`}>
                            <img
                              src={item.nftImage}
                              className="lazy nft__item_preview"
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="nft__item_info">
                          <Link to="/item-details">
                            <h4>Pinky Ocean</h4>
                          </Link>
                          <div className="nft__item_price">3.08 ETH</div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>69</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                <h1>Loading</h1>
              )}
            </Swiper>
          </Fade>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
