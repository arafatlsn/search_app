import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Card from "./Card";
import "./Home.css";
const Home = () => {
  // data states
  const [data, setData] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  //   input fields values states
  //   input fields values states
  const [searchOriginText, setSearchOriginText] = useState("");
  const [searchDesText, setSearchDesText] = useState("");
  const [departDate, setDepartDate] = useState("");
  // console.log(departDate);
  const [returnDate, setReturnDate] = useState("");
  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((result) => setData(result));
  }, []);

  //   useeffect for handling search data
  //   useeffect for handling search data
  useEffect(() => {
    // only origin filled and other fields empty
    // only origin filled and other fields empty
    if (searchOriginText && !searchDesText && !departDate && !returnDate) {
      const filteredOrigin = data?.filter(
        (obj) =>
          obj.origin.toLowerCase().startsWith(searchOriginText) ||
          obj.origin.toLowerCase().includes(searchOriginText)
      );
      setSearchResult(filteredOrigin);
    }
    // only destination filled and other fileds empty
    // only destination filled and other fileds empty
    else if (!searchOriginText && searchDesText && !departDate && !returnDate) {
      const filteredOrigin = data?.filter(
        (obj) =>
          obj.destination.toLowerCase().startsWith(searchDesText) ||
          obj.destination.toLowerCase().includes(searchDesText)
      );
      setSearchResult(filteredOrigin);
    }
    // origin and destination filled and other fields empty
    // origin and destination filled and other fields empty
    else if (searchOriginText && searchDesText && !departDate && !returnDate) {
      const filteredOrigin = data?.filter(
        (obj) =>
          (obj.origin.toLowerCase().startsWith(searchOriginText) ||
            obj.origin.toLowerCase().includes(searchOriginText)) &&
          (obj.destination.toLowerCase().startsWith(searchDesText) ||
            obj.destination.toLowerCase().includes(searchDesText))
      );
      setSearchResult(filteredOrigin);
    }
    // origin, destination, depart date filled return date empty
    // origin, destination, depart date filled return date empty
    else if (searchOriginText && searchDesText && departDate && !returnDate) {
      const filteredOrigin = data?.filter(
        (obj) =>
          (obj.origin.toLowerCase().startsWith(searchOriginText) ||
            obj.origin.toLowerCase().includes(searchOriginText)) &&
          (obj.destination.toLowerCase().startsWith(searchDesText) ||
            obj.destination.toLowerCase().includes(searchDesText)) &&
          // obj.departure_date === departDate
          new Date(obj.departure_date).getTime() ===
            new Date(departDate).getTime()
      );
      setSearchResult(filteredOrigin);
    }
    // all input fileds filled
    // all input fileds filled
    else if (searchOriginText && searchDesText && departDate && returnDate) {
      const filteredAllFields = data?.filter(
        (obj) =>
          (obj.origin.toLowerCase().startsWith(searchOriginText) ||
            obj.origin.toLowerCase().includes(searchOriginText)) &&
          (obj.destination.toLowerCase().startsWith(searchDesText) ||
            obj.destination.toLowerCase().includes(searchDesText)) &&
          new Date(obj.departure_date).getTime() ===
            new Date(departDate).getTime() &&
          new Date(obj.return_date).getTime() === new Date(returnDate).getTime()
      );
      setSearchResult(filteredAllFields);
    }
  }, [searchOriginText, searchDesText, departDate, returnDate]);

  return (
    <div>
      <Container>
        <Row>
          <Col xs={12} md={6} lg={4}>
            <div className="mt-4">
              <h3 className="text-start">One Way</h3>
              <hr />
              <div>
                <div className="d-flex flex-column align-items-start justify-content-center">
                  <p className="">Enter Origin City:</p>
                  <input
                    onChange={(e) =>
                      setSearchOriginText(e.target.value.toLowerCase())
                    }
                    className="input-style"
                    type="text"
                    name="origin_field"
                    id="origin_field"
                  />
                </div>
                <div className="d-flex flex-column align-items-start justify-content-center">
                  <p className="">Enter Destination City:</p>
                  <input
                    onChange={(e) => setSearchDesText(e.target.value)}
                    className="input-style"
                    type="text"
                    name="destination_field"
                    id="destination_field"
                  />
                </div>
                <div className="d-flex flex-column align-items-start justify-content-center">
                  <p className="">Depart Date:</p>
                  <input
                    onChange={(e) => {
                      const today = new Date(e.target.value);
                      const yyyy = today.getFullYear();
                      let mm = today.getMonth() + 1; // Months start at 0!
                      let dd = today.getDate();

                      if (dd < 10) dd = "0" + dd;
                      if (mm < 10) mm = "0" + mm;

                      const formattedToday = mm + "/" + dd + "/" + yyyy;
                      if (formattedToday.split("/")[0] === "NaN") {
                        setDepartDate("");
                        return;
                      }
                      setDepartDate(formattedToday);
                    }}
                    className="input-style"
                    type="date"
                    name="depart_field"
                    id="depart_field"
                  />
                </div>
                <div className="d-flex flex-column align-items-start justify-content-center">
                  <p className="">Return Date:</p>
                  <input
                    onChange={(e) => {
                      const today = new Date(e.target.value);
                      const yyyy = today.getFullYear();
                      let mm = today.getMonth() + 1; // Months start at 0!
                      let dd = today.getDate();

                      if (dd < 10) dd = "0" + dd;
                      if (mm < 10) mm = "0" + mm;

                      const formattedToday = mm + "/" + dd + "/" + yyyy;
                      if (formattedToday.split("/")[0] === "NaN") {
                        setReturnDate("");
                        return;
                      }
                      setReturnDate(formattedToday);
                    }}
                    className="input-style"
                    type="date"
                    name="return_field"
                    id="return_field"
                  />
                </div>
              </div>
            </div>
          </Col>
          <Col xs={12} md={6} lg={8}>
            <div className="result-div">
              {searchOriginText || searchDesText
                ? searchResult?.map((info) => <Card info={info}></Card>)
                : data?.map((info) => <Card info={info}></Card>)}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
