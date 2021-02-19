import React, { useState } from "react";
import { storage } from "./FirebaseConfiguration"; //config firebase file import
import af from "./axiosRealTimeDataBase";



export default function Dashboard() {
  const [val, setVal] = useState({
    Uploadfile: "",
    UploadfileName: "",
    UploadedFileUrl: "",
    isclick: false,
    ConvertedHttpUrlArray: [],
  });
  const [count, setCount] = useState({
    UploadProgres: "",
  });

  const inputTagDataCatchFun = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      const imageName = e.target.files[0].name;
      setVal({ ...val, Uploadfile: image, UploadfileName: imageName });
    } else {
      alert("Please Select Image !");
    }
  };
  const PreventTheRefreshWhenSubmit = (e) => {
    e.preventDefault();
  };

  const FirebaseStorageToDataUpload = () => {
    var fileName = val.UploadfileName;
    var file = val.Uploadfile;
    const uploadTask = storage.ref(`images/${fileName}`).put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progrss function ....
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setCount({ ...count, UploadProgres: progress });
      },
      (error) => {
        // error function ....
        console.log(error);
      },
      () => {
        // complete function uploed file url get....
        storage
          .ref("images") //folder name in the firbase storage
          .child(fileName)
          .getDownloadURL()
          .then((url) => {
            // console.log(url);
            setVal({ ...val, UploadedFileUrl: url });
            var a = new af();
            a.addMethodAxios();

          });
      }
    );
  };

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
        //     console.log(res.items[1]);
        ConvertToHttpUrl(res.items); // call method});
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        // console.log(error);
      });
    //list();
    //  PreventTheRefreshWhenSubmit();
    setVal({ ...val, isclick: true });
  };

  //var i = 0;
  var tempHttpArray = [];
  const ConvertToHttpUrl = (itemRefh) => {
    //  i++;
    //  console.log(itemRefh);
    for (let j = 0; j < itemRefh.length; j++) {
      itemRefh[j].getDownloadURL().then((url) => {
        // tempHttpArray = url;
        console.log(url);
        tempHttpArray[j] = url;
      });
    }
    setVal({ ...val, ConvertedHttpUrlArray: tempHttpArray });
  };

  /**
 var array = ["10", "20", "30"];
  array = val.ConvertedHttpUrlArray;
  const list = () => {
    for (let x = 0; x < array.length; x++) {
      // console.log(x + "---" + array[x]);
      console.log(array[x]);
    }
  }; */
  var array = ["10", "20", "30"];
  array = val.ConvertedHttpUrlArray;
  /**for (let c = 0; c < array.length; c++) {
     return (  <div>
        <ul>
          <li>
            <img
              src={array[c] || "http://via.placeholder.com/100x100"}
              alt={array[c]}
              width="100px"
              height="100px"
            />
          </li>
        </ul>
      </div> );
        } */
  const imglist = array.map((x) => {
    return (
      <div>
        <img
          src={x || "http://via.placeholder.com/100x100"}
          alt={x}
          width="100px"
          height="100px"
        />
      </div>
    );
  });

  /** const switchFun = () => {
    if (val.isclick === true) {
      return imglist;
    } else {
      setVal({ ...val, isclick: false });
    }
  };
 */
  return (
    <section className=" ">
      <div className="row"></div>
      <div className="row">
        <div className="col-6">
          <form onSubmit={PreventTheRefreshWhenSubmit}>
            <input
              type="file"
              onChange={inputTagDataCatchFun}
              accept="image/*"
            />
            <br />
            <br />
            <button onClick={FirebaseStorageToDataUpload}>Upload</button>
            <br />
            <progress value={count.UploadProgres} max="100" />
            <p>{count.UploadProgres}</p>
            <br />
            <button onClick={viewListFunction}>View All</button>
          </form>
        </div>
        <div className="col-6">
          <img
            src={val.UploadedFileUrl || "http://via.placeholder.com/200x200"}
            alt="Uploaded images"
            height="200px"
            width="200px"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-12">{imglist}</div>
      </div>
    </section>
  );
}
