import React, { useState, useContext, Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { requestData } from '../data';
import { RequestContext } from '../LocationContext';

const CreateRequest = (props) => {
  // let { userLat, setUserLat } = useContext(LatitudeContext);
  // console.log(LatitudeContext);

  const [open, setOpen] = useState(false);
  const [requestType, setRequestType] = useState({});
  const [status, setStatus] = useState("unfufilled");
  const [request, setRequest] = useState(JSON.parse(localStorage.getItem('request') || requestData));

  // function getInitialMode(){
  //   const savedMode = JSON.parse(localStorage.getItem('request'))
  //   return savedMode || requestData
  // }

    console.log(request.length);

  // const [lat, setLat] = useState(null);
  // const [lng, setLng] = useState(null);
  const [description, setDescription] = useState("");
  console.log(props)
  // let requestArr = getInitialMode();
  // console.log(requestArr);

  // const [savedArr, setSavedArr] = useState(requestArr)
  
  // console.log(LatitudeContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleType = (e) => {
    setRequestType(e.target.value);
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  // const handleLat = (e) => {
  //   setLat(e.target.value);
  // };

  // const handleLng = (e) => {
  //   setLng(e.target.value);
  // };

  const handleSubmit = () => {
    console.log("submitted");
    let newRequest = {
      id: 5,
      description,
      type: requestType,
      location: {
        lat: props.lat + 10.000,
        lng: props.lng + 12.0022
      },
      color: "blue",
      status: "unfufilled",
      responders: [],
      requester: "user.first_name",
    };
    let tempRequest = [...request, newRequest]
    setRequest(tempRequest);
    localStorage.setItem('request', JSON.stringify(tempRequest))
    console.log(request);

    setOpen(false);
  };



  return (
    <RequestContext.Provider value="hello">
      <form>
        {/* variant="disabled" */}
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Open Request
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create a request</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {/* If up to 5 responders have clicked on this request it will
              automatically be set to fulfilled. If a responder fails to fulfill
              it after 24hrs, the requester can republish it. */}
              Create a request. If after 24 hrs, your request has not been
              fulfilled you can republish it, thanks alot.{" "}
              <strong>PS: You have to fill in your location</strong>.
            </DialogContentText>

            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={requestType}
              onChange={handleType}
            >
              <MenuItem value="One Time Task">One Time Task</MenuItem>
              <MenuItem value="Material Needed">Material Needed</MenuItem>
            </Select>

            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              onChange={handleStatus}
            >
              {/* <MenuItem value="fulfilled">fulfilled</MenuItem> */}
              <MenuItem value="unfulfilled">unfulfilled</MenuItem>
            </Select>

            <TextField
              autoFocus
              margin="dense"
              id="description"
              label="Description"
              type="description"
              fullWidth
              onChange={handleDescription}
              value={description}
            />

            <TextField
              autoFocus
              margin="dense"
              id="lat"
              label="Latitude"
              type="Latitude"
              value={props.lat === 0 ? `Kindly allow location` : props.lat}
              // onChange={handleLat}
              //   fullWidth
            />

            <TextField
              autoFocus
              margin="dense"
              id="Longitude"
              label="Longitude"
              value={props.lng === 0 ? `Kindly allow location` : props.lng}
              type="Longitude"
              // onChange={handleLng}
              //   fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </RequestContext.Provider>
  );
};

export default CreateRequest;




// class CreateRequest extends Component {
//   // let { userLat, setUserLat } = useContext(LatitudeContext);
//   // console.log(LatitudeContext);

//   // getInitialMode = () => {
//   //   return savedMode ;
//   // };

//   state = {
//     open: false,
//     requestType: {},
//     status: "unfufilled",
//     request: JSON.parse(localStorage.getItem("request")) || requestData,
//     description: "",
//     lat: this.props.lat,
//     lng: this.props.lng
//   };

    

//   // const [open, setOpen] = useState(false);
//   // const [requestType, setRequestType] = useState({});
//   // const [status, setStatus] = useState("unfufilled");
//   // const [request, setRequest] = useState(getInitialMode());

//   // console.log(this.state.request.length);

//   // const [lat, setLat] = useState(null);
//   // const [lng, setLng] = useState(null);
//   // const [description, setDescription] = useState("");
//   // console.log(props);

//   // const [savedArr, setSavedArr] = useState(requestArr)

//   // console.log(LatitudeContext);

//   handleClickOpen = () => {
//     this.setState({
//       open: true,
//     });
//   };

//   handleClose = () => {
//     this.setState({
//       open: false,
//     });
//   };

//   handleType = (e) => {
//     this.setState({
//       requestType: e.target.value,
//     });
//   };

//   handleStatus = (e) => {
//     this.setState({
//       status: e.target.value,
//     });
//   };

//   handleDescription = (e) => {
//     this.setState({
//       description: e.target.value,
//     });
//   };

//   // const handleLat = (e) => {
//   //   setLat(e.target.value);
//   // };

//   // const handleLng = (e) => {
//   //   setLng(e.target.value);
//   // };

//   handleSubmit = () => {
//     console.log("submitted");
//     let newRequest = {
//       id: 5,
//       description: this.state.description,
//       type: this.state.requestType,
//       location: {
//         lat: this.state.lat + 20.011,
//         lng: this.state.lng + 18.0022,
//       },
//       color: "blue",
//       status: "unfufilled",
//       responders: [],
//       requester: "user.first_name",
//     };
//     let tempRequest = [...this.state.request, newRequest];
//     this.setState({
//       request: tempRequest
//     });
//     localStorage.setItem("request", JSON.stringify(tempRequest));
//     console.log(this.state.request);

//     this.setState({
//       open: false,
//     });
//   };

//   render() {
//     // let requestArr = this.getInitialMode();
//     // console.log(requestArr);
//     console.log(this.state.request);
//     const {request} = this.state
//     return (
//       <RequestContext.Provider value="hello">
//       <form>
//         {/* variant="disabled" */}
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={this.handleClickOpen}
//         >
//           Open Request
//         </Button>
//         <Dialog
//           open={this.state.open}
//           onClose={this.handleClose}
//           aria-labelledby="form-dialog-title"
//         >
//           <DialogTitle id="form-dialog-title">Create a request</DialogTitle>
//           <DialogContent>
//             <DialogContentText>
//               {/* If up to 5 responders have clicked on this request it will
//               automatically be set to fulfilled. If a responder fails to fulfill
//               it after 24hrs, the requester can republish it. */}
//               Create a request. If after 24 hrs, your request has not been
//               fulfilled you can republish it, thanks alot.{" "}
//               <strong>PS: You have to fill in your location</strong>.
//             </DialogContentText>

//             <InputLabel id="demo-simple-select-label">Type</InputLabel>
//             <Select
//               labelId="demo-simple-select-label"
//               id="demo-simple-select"
//               value={this.state.requestType}
//               onChange={this.handleType}
//             >
//               <MenuItem value="One Time Task">One Time Task</MenuItem>
//               <MenuItem value="Material Needed">Material Needed</MenuItem>
//             </Select>

//             <InputLabel id="demo-simple-select-label">Status</InputLabel>
//             <Select
//               labelId="demo-simple-select-label"
//               id="demo-simple-select"
//               value={this.state.status}
//               onChange={this.handleStatus}
//             >
//               {/* <MenuItem value="fulfilled">fulfilled</MenuItem> */}
//               <MenuItem value="unfulfilled">unfulfilled</MenuItem>
//             </Select>

//             <TextField
//               autoFocus
//               margin="dense"
//               id="description"
//               label="Description"
//               type="description"
//               fullWidth
//               onChange={this.handleDescription}
//               value={this.state.description}
//             />

//             <TextField
//               autoFocus
//               margin="dense"
//               id="lat"
//               label="Latitude"
//               type="Latitude"
//               value={
//                 this.props.lat === 0 ? `Kindly allow location` : this.props.lat
//               }
//               // onChange={handleLat}
//               //   fullWidth
//             />

//             <TextField
//               autoFocus
//               margin="dense"
//               id="Longitude"
//               label="Longitude"
//               value={
//                 this.props.lng === 0 ? `Kindly allow location` : this.props.lng
//               }
//               type="Longitude"
//               // onChange={handleLng}
//               //   fullWidth
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={this.handleClose} color="primary">
//               Cancel
//             </Button>
//             <Button onClick={this.handleSubmit} color="primary">
//               Create
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </form>
//       </RequestContext.Provider>
//     );
//   }
// };

// export default CreateRequest;
