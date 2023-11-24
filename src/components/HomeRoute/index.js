import convertKeysToCamelCase from "../KeyConversion";
import Sidebar from "../Sidebar";
import "./index.css";
import React from "react";
import { Component } from "react";
import { FaLongArrowAltRight, FaBoxes, FaTruck } from "react-icons/fa";
import { GiPathDistance, GiPencil } from "react-icons/gi";
import { IoWarning } from "react-icons/io5";
import { MdHome } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import ReactLoading from "react-loading";

const apiStatusList = {
  init: "INIT",
  loading: "LOADING",
  success: "SUCCESS",
};

class Home extends Component {
  state = {
    movesList: [],
    viewMoreStatus: "",
    apiStatus: apiStatusList.init,
    inventoryIndex: "",
    order: "",
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    this.setState({ apiStatus: apiStatusList.loading });
    const api = "https://www.jsonkeeper.com/b/COZC";
    const response = await fetch(api);
    const data = await response.json();
    const updatedData = convertKeysToCamelCase(data.Customer_Estimate_Flow);
    this.setState({ movesList: updatedData, apiStatus: apiStatusList.success });
  };

  onClickViewMore = (index) => {
    this.setState({ viewMoreStatus: index, inventoryIndex: "", order: "" });
  };

  onClickInventoryCategory = (inventoryIndex, id) => {
    this.setState({ inventoryIndex, order: id });
    console.log("order of item", id);
  };

  renderLoader = () => (
    <div className="d-flex justify-content-center align-items-center m-5 p-5">
      <ReactLoading
        type={"spinningBubbles"}
        color={"skyblue"}
        height={60}
        width={60}
      />
    </div>
  );

  renderDetails = () => {
    const { movesList, viewMoreStatus, inventoryIndex } = this.state;
    return (
      <div className="d-flex flex-row">
        <Sidebar />
        <div>
          <h1 className="my-moves text-danger ms-5 ps-2">EZ Pack & Move</h1>
          <ul className="home-moveslist-ul">
            {movesList.map((each, index) => {
              const { items } = each;
              const { inventory } = items;

              console.log("Inventory", inventory);
              console.log(typeof inventory);

              return (
                <li key={index} className="d-flex flex-column home-moves-li">
                  <div className="d-flex flex-row justify-content-around align-items-center">
                    <div className="d-flex flex-column col-3">
                      <p className="fw-bold">From</p>
                      <p>{each.fromAddress.fromAddress}</p>
                    </div>
                    <div className="arrow-div">
                      <FaLongArrowAltRight className="icon" />
                    </div>
                    <div className="d-flex flex-column col-3">
                      <p className="fw-bold">To</p>
                      <p>{each.movingTo}</p>
                    </div>
                    <div className="d-flex flex-column fw-bold">
                      <p>REQUEST#</p>
                      <p className="icon">{each.estimateId}</p>
                    </div>
                  </div>
                  <div className="d-flex flex-row justify-content-around align-items-center">
                    <div className="d-flex flex-row align-items-center">
                      <MdHome className="icon icon-size" />
                      <p className="pt-3 ps-2">{each.propertySize}</p>
                    </div>
                    <div className="d-flex flex-row align-items-center">
                      <FaBoxes className="icon icon-size" />
                      <p className="pt-3 ps-2">{each.totalItems}</p>
                    </div>
                    <div className="d-flex flex-row align-items-center">
                      <GiPathDistance className="icon icon-size" />
                      <p className="pt-3 ps-2">{each.distance}</p>
                    </div>
                    <div className="d-flex flex-row align-items-center">
                      <FaTruck className="icon icon-size" />
                      <p className="pt-3 ps-2">{each.movingOn}</p>
                      <GiPencil
                        style={{
                          height: "16px",
                          width: "16px",
                          paddingLeft: "3px",
                        }}
                      />
                    </div>
                    <div className="d-flex flex-row align-items-center">
                      <input
                        type="checkbox"
                        className="icon"
                        checked
                        readOnly
                      />
                      <label className="ps-2">Is Flexible</label>
                    </div>
                    <div className="d-flex flex-row align-items-center">
                      <button
                        type="button"
                        className="btn btn-outline-danger m-1"
                        onClick={() => {
                          this.onClickViewMore(index);
                        }}
                      >
                        View move details
                      </button>
                      <button type="button" className="btn btn-danger m-1">
                        Quotes awaiting
                      </button>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center">
                    <IoWarning className="icon ms-3 me-1" />
                    <p className="pt-3">
                      <span className="fw-bold">Disclaimer: </span>Please update
                      your move date before two days of shifting
                    </p>
                  </div>
                  {viewMoreStatus === index && (
                    <>
                      <div>
                        <hr className="hr-line" />
                      </div>
                      <div className="m-3">
                        {/* Additional Information */}

                        <div className="d-flex flex-row justify-content-between">
                          <div className="d-flex flex-column aign-items-start">
                            <h2 className="fw-bold add-info">
                              Additional Information
                            </h2>
                            <p>Add any additional information here</p>
                          </div>
                          <div>
                            <button className="btn btn-dark" type="button">
                              Edit Additional Info
                            </button>
                          </div>
                        </div>
                        <hr className="hr-line" />

                        {/* House Details */}

                        <div className="d-flex flex-column">
                          <div className="d-flex flex-row justify-content-between">
                            <h2 className="fw-bold add-info">House Details</h2>
                            <div>
                              <button className="btn btn-dark" type="button">
                                Edit House Details
                              </button>
                            </div>
                          </div>
                          <h5 className="icon">Existing House Details</h5>
                          <div className="d-flex flex-row justify-content-around">
                            <div className="d-flex flex-column align-items-start">
                              <p className="fw-bold">Floor No.</p>
                              <p>{each.oldFloorNo}</p>
                            </div>
                            <div className="d-flex flex-column align-items-start">
                              <p className="fw-bold">Elevator Available</p>
                              <p>{each.oldElevatorAvailability}</p>
                            </div>
                            <div className="d-flex flex-column align-items-start">
                              <p className="fw-bold">
                                Distance from parking to Elevator/StairCase
                              </p>
                              <p>{each.oldParkingDistance}</p>
                            </div>
                          </div>

                          <h5 className="icon">New House Details</h5>
                          <div className="d-flex flex-row justify-content-around">
                            <div className="d-flex flex-column align-items-start">
                              <p className="fw-bold">Floor No.</p>
                              <p>{each.newFloorNo}</p>
                            </div>
                            <div className="d-flex flex-column align-items-start">
                              <p className="fw-bold">Elevator Available</p>
                              <p>{each.newElevatorAvailability}</p>
                            </div>
                            <div className="d-flex flex-column align-items-start">
                              <p className="fw-bold">
                                Distance from parking to Elevator/StairCase
                              </p>
                              <p>{each.newParkingDistance}</p>
                            </div>
                          </div>
                        </div>
                        <hr className="hr-line" />

                        {/* Inventory Details */}

                        <div className="d-flex flex-column">
                          <div className="d-flex flex-row justify-content-between">
                            <h2 className="fw-bold add-info">
                              Inventory Details
                            </h2>
                            <div>
                              <button className="btn btn-dark" type="button">
                                Edit Inventory Details
                              </button>
                            </div>
                          </div>
                          <ul className="inventory-ul-list">
                            {items.inventory.map((eachItem, index) => (
                              <li key={`inventory ${eachItem.order}`}>
                                <div className="inventory-li">
                                  <div className="d-flex flex-row align-items-center pt-2 fw-bold">
                                    <p className="icon">
                                      {eachItem.displayName}
                                    </p>
                                  </div>

                                  <button
                                    className="btn"
                                    type="button"
                                    onClick={() =>
                                      this.onClickInventoryCategory(
                                        index,
                                        eachItem.id
                                      )
                                    }
                                  >
                                    <MdOutlineKeyboardArrowDown className="icon" />
                                  </button>
                                </div>
                                {/* Inventory category details */}
                                {inventoryIndex === index && (
                                  <ul>
                                    {inventory.map(
                                      (eachInventory, outerIndex) => {
                                        const { category } = eachInventory;
                                        return (
                                          <ul key={outerIndex}>
                                            {category.map(
                                              (eachCatItem, innerIndex) => {
                                                const { items } = eachCatItem;
                                                const { order } = this.state;
                                                return (
                                                  <ul
                                                    key={innerIndex}
                                                    className="item-ul-list"
                                                  >
                                                    {items.map(
                                                      (
                                                        eachItemDetails,
                                                        detailsIndex
                                                      ) => {
                                                        if (
                                                          order ===
                                                            eachItemDetails
                                                              .id[0] &&
                                                          eachItemDetails.qty >
                                                            0
                                                        ) {
                                                          return (
                                                            <li
                                                              key={detailsIndex}
                                                              className="inventory-li-item col-3"
                                                            >
                                                              <p>
                                                                {`${eachItemDetails.displayName}: ${eachItemDetails.qty}`}
                                                              </p>
                                                            </li>
                                                          );
                                                        }
                                                        // If conditions don't match, don't render
                                                        return null;
                                                      }
                                                    )}
                                                  </ul>
                                                );
                                              }
                                            )}
                                          </ul>
                                        );
                                      }
                                    )}
                                  </ul>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  };

  renderPage = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusList.loading:
        return this.renderLoader();
      case apiStatusList.success:
        return this.renderDetails();

      default:
        return null;
    }
  };

  render() {
    return this.renderPage();
  }
}

export default Home;
