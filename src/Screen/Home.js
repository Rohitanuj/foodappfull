import React, { useEffect, useState } from "react";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Card from "../Components/Card";
//import Carousal from "../Components/Carousal";

export default function Home() {
  const [search, setsearch] = useState("");
  const [foodCat, setFootCat] = useState([]);
  const [foodItem, setFootItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setFootItem(response[0]);
    setFootCat(response[1]);
    // console.log(response[0], response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      <div>
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carsoel">
            <div className="carousel-caption" style={{ zIndex: "10" }}></div>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => {
                  setsearch(e.target.value);
                }}
              />
              {/* <button
                className="btn btn-outline-success test-white"
                type="submit"
              >
                Search
              </button> */}
            </div>

            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/900x700/?burger"
                className="d-block width: 100%; min-height: auto"
                alt="..."
                style={{ width: "1500px", height: "700px", objectFit: "fill" }}
                class="center-container"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?pizza"
                className="d-block width: 100%; min-height: auto"
                alt="..."
                style={{ width: "1500px", height: "700px", objectFit: "fill" }}
                class="center-container"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?noodle"
                className="d-block width: 100%; min-height: auto"
                alt="..."
                style={{ width: "1500px", height: "700px", objectFit: "fill" }}
                class="center-container"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {foodCat !== [] ? (
          foodCat.map((data) => {
            return (
              <div className="row m-3">
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr />{" "}
                {foodItem !== [] ? (
                  foodItem
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name
                          .toLowerCase()
                          .includes(search.toLocaleLowerCase())
                    )
                    .map((filterItems) => {
                      return (
                        <div
                          key={filterItems._id}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <Card
                            foodItem={filterItems}
                            options={filterItems.options[0]}
                          ></Card>
                        </div>
                      );
                    })
                ) : (
                  <div>No DATA FOUND</div>
                )}
              </div>
            );
          })
        ) : (
          <div>"""""</div>
        )}
      </div>

      <div>
        <Footer></Footer>
      </div>
    </div>
  );
}
