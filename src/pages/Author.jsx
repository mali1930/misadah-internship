import React, { useState, useEffect } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";
const Author = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const [follow, setFollow] = useState(false);
  const [loading, setLoading] = useState(false);

  async function fetchSellers() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
    );
    setLoading(false);
    setDetail(data);
  }

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      fetchSellers();
    }, 2000);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              {loading ? (
                <>
                  <div className="col-md-12">
                    <div className="-d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="-profile_avatar">
                          <div className="mr40">
                            <div className="item_author">
                              <div className="author_list_pp mt-4">
                                <Skeleton
                                  width="50px"
                                  height="50px"
                                  borderRadius="50%"
                                />
                              </div>
                              <div className="author_list_info">
                                <Skeleton width="150px" height="30px" />
                              </div>
                              <div className="author_list_info">
                                <Skeleton width="150px" height="30px" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="profile_follower">
                            <Skeleton width="100%" height="40px" />
                            <div style={{ opacity: "-1" }}>Followers</div>
                          </div>
                         
                          <div className="profile_follower">
                            <Skeleton width="100%" height="40px" />
                            <div style={{ opacity: "-1" }}>Followers</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <div className="tab-1">
                          <div className="row">
                            {[1, 2, 3, 4].map((item) => (
                              <div
                                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                                key={item?.id}
                              >
                                <div className="nft__item">
                                  <div className="author_list_pp">
                                    <div className="author_list_pp mt-4">
                                      <Skeleton
                                        width="50px"
                                        height="50px"
                                        borderRadius="50%"
                                      />
                                    </div>
                                  </div>
                                  <div className="nft__item_wrap">
                                    <div className="nft__item_extra">
                                      <div className="nft__item_buttons">
                                        <div className="nft__item_share">
                                          <h4>Share</h4>
                                          <a
                                            href=""
                                            target="_blank"
                                            rel="noreferrer"
                                          >
                                            <i className="fa fa-facebook fa-lg"></i>
                                          </a>
                                          <a
                                            href=""
                                            target="_blank"
                                            rel="noreferrer"
                                          >
                                            <i className="fa fa-twitter fa-lg"></i>
                                          </a>
                                          <a href="">
                                            <i className="fa fa-envelope fa-lg"></i>
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                    <Link to={`/item-details/${item?.nftId}`}>
                                      <Skeleton width="100%" height="100%" />
                                    </Link>
                                  </div>
                                  <div className="nft__item_info">
                                    <div className="nft__item_price"></div>
                                    <div className="nft__item_like">
                                      <i className="fa fa-heart"></i>
                                      <span></span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <img src={detail.authorImage} alt="img" />

                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              <span className="profile_username">
                                @{detail.authorName}
                              </span>
                              <span id="wallet" className="profile_wallet">
                                {detail.address}
                              </span>
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="profile_follower">
                            {detail.followers - (follow ? "" : 1)} Followers
                          </div>
                          {!follow ? (
                            <Link
                              to="#"
                              className="btn-main"
                              onClick={() => setFollow(true)}
                            >
                              Follow
                            </Link>
                          ) : (
                            <Link
                              to="#"
                              className="btn-main"
                              onClick={() => setFollow(false)}
                            >
                              unfollow
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="de_tab tab_simple">
                      <AuthorItems />
                      <AuthorItems detail={detail} />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
