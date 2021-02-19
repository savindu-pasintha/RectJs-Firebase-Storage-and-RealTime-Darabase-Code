import "./App.css";
import { Card, Table } from "react-bootstrap";
import React, { useState } from "react";
import { storage } from "./Dashboard/FirebaseConfiguration"; //config firebase file import

function App() {
  const [count, setCount] = useState({
    img1: 0,
    img2: 0,
    rate1: 0,
    rate2: 0,
  });
  const [img, setImg] = useState({
    imgname1: "jj",
    imgname2: "pp",
    path1: "",
    path2: "",
    ConvertedHttpUrlArray: [],
  });

  const viewListFunction = async () => {
    // Create a reference under which you want to list
    var listRef = storage.ref().child("images/"); // foldername in the Firbase storag
    // Find all the prefixes and items.

    // Find all the prefixes and items.
    await listRef
      .listAll()
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
          //  console.log(folderRef.toString());
        });
        //  console.log("----------------------");
      //  console.log(res.items);
        ConvertToHttpUrl(res.items); // call method});
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        // console.log(error);
      });
    //list();
    //  PreventTheRefreshWhenSubmit();
  };

  //var i = 0;
  var tempHttpArray = [];
  const ConvertToHttpUrl = (itemRefh) => {
    //  i++;
    //  console.log(itemRefh);
    for (let j = 0; j < itemRefh.length; j++) {
      itemRefh[j].getDownloadURL().then((url) => {
        // tempHttpArray = url;
        //  console.log(j + "=========" + url);
        tempHttpArray[j] = url;
      });
    }
    setImg({ ...img, ConvertedHttpUrlArray: tempHttpArray });
  };

  const clickMe1 = () => {
    viewListFunction();
    imgLoader();
    setCount({ ...count, img1: count.img1 + 1 });
  };
  const clickMe2 = () => {
    imgLoader();
    setCount({ ...count, img2: count.img2 + 1 });
  };

  var arr = [];
  arr = img.ConvertedHttpUrlArray;

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  const imgLoader = () => {
    var x = getRandomInt(arr.length);
    var y = getRandomInt(arr.length);
    if (x !== y) {
      setImg({ imgname1: arr[x], imgname2: arr[y] });
      console.log(count.imgname1);
      console.log(count.imgname2);
      console.log(x + "====" + y + "===" + arr[y]);
    } else {
      setCount({ ...img, imgname1: arr[x], imgname2: arr[y + 1] });
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-md-6">
            <Card style={{ width: "100%" }}>
              <img
                onClick={clickMe1}
                src={img.imgname1}
                className="App-logo"
                alt="logo"
                width="200px"
                height="200px"
              />
            </Card>
          </div>
          <div className="col-sm-6 col-md-6 ">
            <Card style={{ width: "100%" }}>
              <img
                onClick={clickMe2}
                src={img.imgname2}
                className="App-logo"
                alt="logo"
                width="200px"
                height="200px"
              />
            </Card>
          </div>
        </div>
        <br />

        <br />
        <div className="row">
          <div className="col-sm-12 col-md-12">
            <Card style={{ width: "100%", height: " 200px" }}>
              <h3>
                Clicked time = <span>{count.img1}</span>
              </h3>
              <h3>Rating = {count.rate1}</h3>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Image Name</th>
                    <th>Clicked times</th>
                    <th>Rating </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
