import axios from "axios";

export default class af {
  obj = {};
  url = "https://reactnativesavindu-default-rtdb.firebaseio.com/images"; //"http://localhost:3001/photo";
  id = "";
  json = ".json";
  apiurl = this.url + this.id + this.json;
  readArrayData = [];
  //read
  readMethodAxios = async () => {
    try {
      await axios
        .get(this.apiurl)
        .then((response) => {
          if (response.data) {
            //database data values assign to userState objects
            var set = response.data;
            // console.log(set);  var obj = JSON.parse(set);//json objects conver to readable string
            //  console.log(Object.values(set)); //array object to convert consol.log(arr[0]}
            this.readArrayData = Object.values(set); //json data set convert as a java script array object
          }
        })
        .catch((error) => {
          throw error;
        });
    } catch (e) {
      throw e;
    }
  };
  //add
  addMethodAxios = async () => {
    try {
      await axios
        .put(this.apiurl, this.obj)
        .then((response) => {
          // console.log(response);
          console.log(response);
        })
        .catch((error) => {
          throw error;
          // console.log(error);
        });
    } catch (e) {
      throw e;
    }
  };
  //update
  updateMethodAxios = async () => {
    try {
      await axios
        .patch(this.apiurl, this.obj)
        .then((response) => {
          // console.log(response);
          console.log(response);
        })
        .catch((error) => {
          throw error;
          // console.log(error);
        });
    } catch (e) {
      throw e;
    }
  };
  //delete
}
