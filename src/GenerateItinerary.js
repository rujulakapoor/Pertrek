import React, { Component, useState } from "react";
import {
  Button,
  Modal,
  Jumbotron,
  Table,
  Tab,
  Tabs,
  TabPane,
  ProgressBar,
  Accordion,
  Card,
  Badge,
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  OverlayTrigger,
  Tooltip,
  DropdownButton,
  InputGroup,
  Dropdown,
} from "react-bootstrap";
import Attractions from "./Attractions.js";
import Custom from "./customAttractions.js";
import { Link } from "react-router-dom";
import { FiEdit2, FiSave } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
import fire from "./config/fire";
import TimePicker from "react-gradient-timepicker";
import Timetable from "./Timetable";
import PreviewAttractions from "./PreviewAttractions";
import { TimeInput } from "./TimeInput";
import { TimeInput2 } from "./TimeInput2";
import RentalCar from "./RentalCar";
import Breakfast from "./Breakfast";
import Lunch from "./Lunch";
import Dinner from "./Dinner";
import Snack from "./Snack";
import Other from "./Other";
import Plane from "./Plane";
import Plane1 from "./Plane1";
import MapAll from "./MapAll";
import LocationIQ from "react-native-locationiq";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  fas,
  faHamburger,
  faPizzaSlice,
  faIceCream,
  faBirthdayCake,
  faCookie,
  faCoffee,
} from "@fortawesome/free-solid-svg-icons";
import Geocode from "react-geocode";
import bootbox from "bootbox";
import AddEventModal from "./AddEventModal";
import MiniTravelCosts from "./MiniTravelCosts";
import OriginalEventModal from "./OriginalEventModal";
import PieChart from "react-minimal-pie-chart";
import ReactMinimalPieChart from "react-minimal-pie-chart";
import { Progress } from "semantic-ui-react";
import "./GenerateItinerary.css";

import {
  EmailShareButton,
  FacebookShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
  EmailIcon,
  FacebookIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon,
} from "react-share";
LocationIQ.init("c4e640b5ed0925");
Geocode.setApiKey("AIzaSyBvjIBIZImCFAb-6Rtz2C7EQlnS1Ga1Z0o");
// Geocodio Key: ee000100feccee8445ccfee8e0c0fcedef8e545
export class GenerateItinerary extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.calculateDaysAgain = this.calculateDaysAgain.bind(this);
    this.changeNotes = this.changeNotes.bind(this);
    this.changeStart = this.changeStart.bind(this);
    this.changeEnd = this.changeEnd.bind(this);
    this.changeBudget = this.changeBudget.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSavedEdits = this.handleSavedEdits.bind(this);
    this.handleChangeTab1 = this.handleChangeTab1.bind(this);
    this.handleChangeTab2 = this.handleChangeTab2.bind(this);
    this.getDestinations = this.getDestinations.bind(this);
    this.changePartySize = this.changePartySize.bind(this);
    this.changeMaxdist = this.changeMaxdist.bind(this);
    this.saveNewEvent = this.saveNewEvent.bind(this);
    this.newbudget = this.newbudget.bind(this);
    this.handleMiniTravel = this.handleMiniTravel.bind(this);
    this.handleAddBreakfast = this.handleAddBreakfast.bind(this);
    this.handleAddLunch = this.handleAddLunch.bind(this);
    this.handleAddDinner = this.handleAddDinner.bind(this);
    this.handleAddSnack = this.handleAddSnack.bind(this);
    this.handleAddOther = this.handleAddOther.bind(this);
    this.handleOriginalAdd = this.handleOriginalAdd.bind(this);
    this.deleteOldEvent = this.deleteOldEvent.bind(this);
    this.handleChangeOrange = this.handleChangeOrange.bind(this);
    this.handleChangeBlack = this.handleChangeBlack.bind(this);
    this.handleChangeBlue = this.handleChangeBlue.bind(this);
    this.handleChangeGreen = this.handleChangeGreen.bind(this);
    this.handleChangeYellow = this.handleChangeYellow.bind(this);
    this.handleChangeMaroon = this.handleChangeMaroon.bind(this);
    this.handleChangePurple = this.handleChangePurple.bind(this);
    this.handleChangeArial = this.handleChangeArial.bind(this);
    this.handleChangeTimes = this.handleChangeTimes.bind(this);
    this.handleChangeQuicksand = this.handleChangeQuicksand.bind(this);
    this.handleChangeComic = this.handleChangeComic.bind(this);
    this.handleChangeSize1 = this.handleChangeSize1.bind(this);
    this.handleChangeSize2 = this.handleChangeSize2.bind(this);
    this.handleChangeSize3 = this.handleChangeSize3.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onCustomCategory = this.onCustomCategory.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.addCustomEvent = this.addCustomEvent.bind(this);
    this.state = {
      enddate: this.props.values.enddate,
      startdate: this.props.values.startdate,
      budget: this.props.values.budget,
      title: this.props.values.title,
      notes: this.props.values.notes,
      location: this.props.values.location,
      Plate: this.props.values.Plate,
      CostH: this.props.values.CostH,
      costcc: this.props.values.costcc,
      HName: this.props.values.HName,
      plane1n: this.props.values.plane1n,
      plane1d: this.props.values.plane1d,
      plane1t: this.props.values.plane1t,
      plane2n: this.props.values.plane2n,
      plane2d: this.props.values.plane2d,
      plane2t: this.props.values.plane2t,
      plane3n: this.props.values.plane3n,
      plane3d: this.props.values.plane3d,
      plane3t: this.props.values.plane3t,
      countf: this.props.values.countf,
      partysize: this.props.values.partysize,
      orange: this.props.values.orange,
      black: this.props.values.black,
      blue: this.props.values.blue,
      green: this.props.values.green,
      purple: this.props.values.purple,
      maroon: this.props.values.maroon,
      yellow: this.props.values.yellow,
      arial: this.props.values.arial,
      times: this.props.values.times,
      quicksand: this.props.values.quicksand,
      comic: this.props.values.comic,
      size1: this.props.values.size1,
      size2: this.props.values.size2,
      size3: this.props.values.size3,
      maxdist: this.props.values.maxdist,
      days: [],
      alreadysaved: false,
      edittitle: false,
      editlocation: false,
      editbudget: false,
      editnotes: false,
      editstart: false,
      editend: false,
      editpartysize: false,
      editmaxdist: false,
      editColor: false,
      typetab: false,
      itkey: this.props.values.itkey,
      retreived: false,
      destinations: [],
      dailydata: this.props.values.dailydata,
      numdays: this.props.values.numdays,
      timesoftheday: [],
      currentEvent: {},
      currentlyEditing: false,
      totalexpenses: 0, // need to save all of these things again!
      minitravel: 0,
      breakfast: 0,
      lunch: 0,
      dinner: 0,
      snack: 0,
      other: 0,

      currentlyEditingOriginal: false,
      value: "",
      category: "",
    };
  }

  handleAddBreakfast(cost) {
    this.setState({
      breakfast: cost,
    });
    // console.log("HANDLED BREAKFAST")
  }
  handleAddLunch(cost) {
    this.setState({
      lunch: cost,
    });
    // console.log("HANDLED Lunch")
  }
  handleAddDinner(cost) {
    this.setState({
      dinner: cost,
    });
    // console.log("HANDLED dinner")
  }
  handleAddSnack(cost) {
    this.setState({
      snack: cost,
    });
    //  console.log("HANDLED snack")
  }
  handleAddOther(cost) {
    this.setState({
      other: cost,
    });
    //  console.log("HANDLED other")
  }
  handleMiniTravel(cost) {
    this.setState({
      minitravel: cost,
    });
    //console.log("Done in mini travel")
  }

  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  //Deletes from the daily data info about the event that was there

  deleteOldEvent(time, event, daynum) {
    //console.log("DELETING FROM ITINERARY")

    var midstr = time.substring(0, 2);
    var starthour = parseInt(midstr);
    var storedcost = this.state.dailydata[daynum].scheduleactivities[
      time.valueOf()
    ].cost;

    var startmin = parseInt(time.substring(3, 5));

    for (var i = 0; i < event.duration; i++) {
      var str = "";
      if (starthour < 10) {
        str += 0;
      }
      str += starthour;
      str += ":";
      if (startmin < 15) {
        str += "00";
      } else {
        str += startmin;
      }

      if (startmin == 45) {
        startmin = 0;
        starthour++;
      } else {
        startmin += 15;
      }
      console.log("STRING IS");
      console.log(str);
      console.log(str.toString());

      this.state.dailydata[daynum].scheduleactivities[
        str.valueOf()
      ].eventdetails = {};
      this.state.dailydata[daynum].scheduleactivities[
        str.valueOf()
      ].isfirst = false;

      // need to decrement the cost too
    }
    this.state.dailydata[daynum].cost -= storedcost;
    var intexp = (this.state.totalexpenses -= storedcost);
    this.setState({
      totalexpenses: intexp,
    });

    //do i need hooks here
    this.state.alreadysaved = false;
    this.handleSavedEdits();
  }

  saveNewEvent = (info) => {
    //Add it to the itinerary table for the desired day. Use the
    //index of chosen day
    //also, close the modal.
    //On clicking Add in PreviewAttr
    //change mode to create modal and put the attraction in currentEvent to add to the table

    //assume info has start time, duration, and
    this.setState({
      currentlyEditing: false,
      currentlyEditingOriginal: false,
    });

    var stufftosave;
    if (this.state.currentEvent === 0) {
      stufftosave = {
        name: info.name,
      };
    } else {
      stufftosave = this.state.currentEvent;
    }
    /*
    Object(info.blockids).map((block, key) => {
      if (key == 0) {
        this.state.dailydata[info.day].scheduleactivities[
          block.toString()
        ].isfirst = true;
        this.state.dailydata[info.day].scheduleactivities[
          block.toString()
        ].duration = info.blocks;
        this.state.dailydata[info.day].scheduleactivities[
          block.toString()
        ].cost = info.cost;
      } else {
        this.state.dailydata[info.day].scheduleactivities[
          block.toString()
        ].isfirst = false;
      }

      this.state.dailydata[info.day].scheduleactivities[
        block.toString()
      ].eventdetails = stufftosave;

      this.state.dailydata[info.day].scheduleactivities[
        block.toString()
      ].notes = info.notes;
    });
    */
    this.state.dailydata[info.day].cost += info.cost;
    this.state.totalexpenses += info.cost;
    this.state.alreadysaved = false;
    this.handleSavedEdits();
  };

  handleEventAdd = (info) => {
    console.log("HANDLING ADDING AN EVENT")
    this.state.currentEvent = info;
    this.state.currentlyEditing = true;
    this.setState({currentlyEditing:true})
    console.log(this.state.currentlyEditing)
  };

  handleOriginalAdd() {
    
    console.log("HANDLING ADDING AN original EVENT")
    this.state.currentEvent = 0;
    this.state.currentlyEditingOriginal = true;
    this.setState({
      currentlyEditingOriginal: true,
    });
  }

  handleSaveEvent = (info) => {
    // this.setState({currentlyEditing: false});
    // get info
  };

  calculateDaysAgain() {
    let currentState = this;
    const end = new Date(this.state.enddate);
    end.setDate(end.getDate() + 1);
    const start = new Date(this.state.startdate);
    start.setDate(start.getDate() + 1);
    currentState.setState(
      {
        days: [],
      },
      function () {
        let len = 1;
        for (var d = start; d <= end; d.setDate(d.getDate() + 1)) {
          currentState.state.days.push(new Date(d));
          if (len++ > 31) {
            break;
          }
        }
      }
    );
    this.setState({
      alreadysaved: true,
    });
  }

  componentWillMount() {
    const end = new Date(this.state.enddate);
    end.setDate(end.getDate() + 1);
    const start = new Date(this.state.startdate);
    start.setDate(start.getDate() + 1);

    //Only need to do this if dailydata = null ?

    if (
      JSON.stringify(this.props.values.dailydata) === "{}" ||
      this.props.values.dailydata == null
    ) {
      console.log("NO DAILY DATA DETECTED");
      var intdailydata = [];
      let len = 0;
      for (var d = start; d <= end; d.setDate(d.getDate() + 1)) {
        this.state.days.push(new Date(d));

        var thisdaystimes = [];

        //Calculate times of day
        var hours = 0;
        var minutes = 0;
        for (var i = 0; i < 24; i++) {
          minutes = 0;
          for (var j = 0; j < 4; j++) {
            var str = "";

            if (hours < 10) {
              str += "0";
            }
            str += hours;
            str += ":";
            if (minutes < 15) {
              str += "00";
            } else {
              str += minutes;
            }

            thisdaystimes[str.valueOf()] = {
              eventdetails: {},
              isfirst: false,
              duration: 0,
              cost: 0,
            };
            minutes += 15;
          }
          hours++;
        }

        str = len.toString();

        //initialize dailydata for days

        intdailydata[str.valueOf()] = {
          scheduleactivities: thisdaystimes,
          cost: 0,
        };

        if (len++ > 30) {
          break;
        }
        this.setState({ numdays: len });
        this.setState({ dailydata: intdailydata });
      }

      

      console.log(this.state.dailydata);
    } else {
      console.log("DAILY DATA FOUND");
      console.log(this.props.values.dailydata);
      console.log(this.state.dailydata);
      this.setState({ dailydata: this.props.values.dailydata });
      for (var d = start; d <= end; d.setDate(d.getDate() + 1)) {
        this.state.days.push(new Date(d));
      }
      console.log(this.state.days);
    }
    console.log("IN COMPONENT WILL MOUNT");
    this.getDestinations();
    this.state.timesoftheday[1000] = "BOFA";
  }

  handleSavedEdits() {
    //delete old Itinerary

    if (this.state.itkey != null && this.state.alreadysaved === false) {
      //Delete from firebase
      const user = fire.auth().currentUser.uid;
      fire
        .database()
        .ref("itineraries/" + user)
        .child(this.state.itkey)
        .remove();

      // if(this.state.alreadysaved == true) {
      //   this.setState({
      //     alreadysaved: false
      //   })
      //
      // }

      this.save();
    } else {
      this.save();
    }
  }

  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  save() {
    //need to update itkey
    if (this.state.alreadysaved == false) {
      const user = fire.auth().currentUser.uid;
      const db = fire.database().ref("itineraries/" + user);
      const item = {
        notes: this.state.notes,
        title: this.state.title,
        location: this.state.location,
        startdate: this.state.startdate,
        enddate: this.state.enddate,
        budget: this.state.budget,
        Plate: this.state.Plate,
        CostH: this.state.CostH,
        costcc: this.state.costcc,
        HName: this.state.HName,
        plane1n: this.state.plane1n,
        plane1d: this.state.plane1d,
        plane1t: this.state.plane1t,
        plane2n: this.state.plane2n,
        plane2d: this.state.plane2d,
        plane2t: this.state.plane2t,
        plane3n: this.state.plane3n,
        plane3d: this.state.plane3d,
        plane3t: this.state.plane3t,
        orange: this.state.orange,
        yellow: this.state.yellow,
        green: this.state.green,
        black: this.state.black,
        purple: this.state.purple,
        maroon: this.state.maroon,
        blue: this.state.blue,
        times: this.state.times,
        arial: this.state.arial,
        quicksand: this.state.quicksand,
        comic: this.state.comic,
        size1: this.state.size1,
        size2: this.state.size2,
        size3: this.state.size3,
        countf: this.state.countf,
        partysize: this.state.partysize,
        maxdist: this.state.maxdist,
        dailydata: this.state.dailydata,
        numdays: this.state.numdays,
      };

      if (item.partysize === undefined) {
        item.partysize = null;
      }
      if (item.maxdist === undefined) {
        item.maxdist = 10;
      }

      db.push(item).then((ref) => {
        console.log("Added document with ID: ", ref.id);
        console.log(ref);
        this.setState({
          itkey: ref.path.pieces_[2],
        });
      });

      console.log("save completed?" + item);
      console.log(item);
      this.setState({
        alreadysaved: true,
      });
    } else {
      // console.log("Already saved")
    }
  }

  getDestinations() {
    if (this.state.retreived === false) {
      const user = fire.auth().currentUser.uid;
      fire
        .database()
        .ref("destinations/" + user + "/" + this.state.title)
        .on("value", (snapshot) => {
          if (snapshot.val()) {
            let currentstate = this;
            //alert("inside getdest")

            const values = snapshot.val();
            console.log(values);

            var name;
            var id;
            Object.entries(values).map((thing) => {
              console.log("key val is " + thing);
              console.log(thing[1].name);
              name = thing[1].name;
              console.log(thing[1].address);
              console.log(thing[1].id);
              id = thing[1].id;
              var thing;
              /*
          geocodio.get('geocode', {q: thing[1].address}, function(err, response){
            if (err) throw err;
            
            console.log(response);
          });
          
          LocationIQ.search(thing[1].address)
          .then(json => {
              var lat = json[0].lat;
              var lon = json[0].lon;
              console.log(lat, lon);
              thing = {
                lat: lat,
                lon: lon
              }
              
          })
          .catch(error => console.warn(error));
          */
              Geocode.fromAddress(thing[1].address).then(
                (response) => {
                  //  console.log("RESPONSE FROM GOOGLE GEOCODER")
                  //     console.log(response)
                  //   console.log(response.results[0].geometry.location)
                  if (response.results[0] != undefined) {
                    var lat = response.results[0].geometry.location.lat;
                    var lon = response.results[0].geometry.location.lng;
                    var item = {
                      lat: lat,
                      lon: lon,
                      name: thing[1].name,
                      address: thing[1].address,
                    };
                    this.setState({
                      destinations: [...currentstate.state.destinations, item],
                    });
                  }
                },
                (error) => {
                  alert(
                    "Geocode was not successful for the following reason: " +
                      error
                  );
                }
              );

              /*
          console.log("PUT THE SET STATE HERREEE THEN")
          currentstate.setState( {
            destinations: [...currentstate.state.destinations,  thing]
          })
          */
            });
          }
        });

      // console.log(snapshot.val())
      // this.setState( {
      // itineraries: [...this.state.itineraries, snapshot.val()]
      //0})

      this.state.retreived = true;
    }
  }

  handleChangeOrange() {
    if (this.state.orange != 1) {
      this.setState({
        orange: true,
      });
    } else {
      this.setState({
        orange: false,
      });
    }
    //alert("ORANFE&&&&&&&" + this.state.orange);
  }
  handleChangeYellow() {
    if (this.state.yellow != 1) {
      this.setState({
        yellow: true,
      });
    } else {
      this.setState({
        yellow: false,
      });
    }
    //alert("ORANFE&&&&&&&" + this.state.orange);
  }

  handleChangeGreen() {
    if (this.state.green != 1) {
      this.setState({
        green: true,
      });
    } else {
      this.setState({
        green: false,
      });
    }
    //alert("ORANFE&&&&&&&" + this.state.orange);
  }

  handleChangeBlue() {
    if (this.state.blue != 1) {
      this.setState({
        blue: true,
      });
    } else {
      this.setState({
        blue: false,
      });
    }
    //alert("ORANFE&&&&&&&" + this.state.orange);
  }
  handleChangePurple() {
    if (this.state.purple != 1) {
      this.setState({
        purple: true,
      });
    } else {
      this.setState({
        purple: false,
      });
    }
    //alert("ORANFE&&&&&&&" + this.state.orange);
  }
  handleChangeMaroon() {
    if (this.state.maroon != 1) {
      this.setState({
        maroon: true,
      });
    } else {
      this.setState({
        maroon: false,
      });
    }
    //alert("ORANFE&&&&&&&" + this.state.orange);
  }

  handleChangeBlack() {
    if (this.state.black != 1) {
      this.setState({
        black: true,
      });
    } else {
      this.setState({
        black: false,
      });
    }
    //alert("ORANFE&&&&&&&" + this.state.orange);
  }
  handleChangeSize1() {
    if (this.state.size1 != 1) {
      this.setState({
        size1: true,
      });
    } else {
      this.setState({
        size1: false,
      });
    }
    //alert("ORANFE&&&&&&&" + this.state.orange);
  }
  handleChangeSize2() {
    if (this.state.size2 != 1) {
      this.setState({
        size2: true,
      });
    } else {
      this.setState({
        size2: false,
      });
    }
    //alert("ORANFE&&&&&&&" + this.state.orange);
  }
  handleChangeSize3() {
    if (this.state.size3 != 1) {
      this.setState({
        size3: true,
      });
    } else {
      this.setState({
        size3: false,
      });
    }
    //alert("ORANFE&&&&&&&" + this.state.orange);
  }
  handleChangeArial() {
    if (this.state.arial != 1) {
      this.setState({
        arial: true,
      });
    } else {
      this.setState({
        arial: false,
      });
    }
    //alert("ORANFE&&&&&&&" + this.state.orange);
  }
  handleChangeTimes() {
    if (this.state.times != 1) {
      this.setState({
        times: true,
      });
    } else {
      this.setState({
        times: false,
      });
    }
    //alert("ORANFE&&&&&&&" + this.state.orange);
  }
  handleChangeComic() {
    if (this.state.comic != 1) {
      this.setState({
        comic: true,
      });
    } else {
      this.setState({
        comic: false,
      });
    }
    //alert("ORANFE&&&&&&&" + this.state.orange);
  }
  handleChangeQuicksand() {
    if (this.state.quicksand != 1) {
      this.setState({
        quicksand: true,
      });
    } else {
      this.setState({
        quicksand: false,
      });
    }
    //alert("ORANFE&&&&&&&" + this.state.orange);
  }
  renderTotalMealCost() {
    var totalMeal =
      parseInt(this.state.breakfast) +
      parseInt(this.state.lunch) +
      parseInt(this.state.dinner) +
      (parseInt(this.state.snack) + parseInt(this.state.other));
    var var1 = parseInt(this.state.breakfast);
    var var2 = parseInt(this.state.lunch);
    var var3 = parseInt(this.state.dinner);
    var var4 = parseInt(this.state.other);
    var var5 = parseInt(this.state.snack);
    var yikes = 0;
    var recCost = this.state.partysize * 60;
    var amountLeft = recCost - totalMeal;

    var percentLeft = (amountLeft / recCost) * 100;
    percentLeft = 100 - Math.round(percentLeft);

    if (totalMeal != 0) {
      var bPercent = (var1 / totalMeal) * 100;

      var lPercent = (var2 / totalMeal) * 100;
      lPercent = Math.round(lPercent);

      var lPercent = (var2 / totalMeal) * 100;
      lPercent = Math.round(lPercent);

      var dPercent = (var3 / totalMeal) * 100;
      dPercent = Math.round(dPercent);

      var oPercent = (var4 / totalMeal) * 100;
      oPercent = Math.round(oPercent);

      var sPercent = (var5 / totalMeal) * 100;
      sPercent = Math.round(sPercent);
    } else {
      var bPercent = 0;
      var lPercent = 0;
      var dPercent = 0;
      var oPercent = 0;
      var sPercent = 0;
    }
    if (percentLeft < 100) {
      return (
        <div id="mealbudgetstuff">
          <Row>
            <Col>
              <h2> Current Meal Cost : ${totalMeal} </h2>
            </Col>
            <Col>
              <h2> Recommended Meal Budget : ${recCost} </h2>
            </Col>
          </Row>
          <div id="piechart">
            <Row>
              <Col>
                <div>
                  <ProgressBar>
                    <ProgressBar
                      variant="danger"
                      now={percentLeft}
                      key={1}
                      label="Meal Budget Spent"
                    />
                  </ProgressBar>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      );
    } else {
      return (
        <div id="mealbudgetstuff">
          <Row>
            <Col>
              <h2> Current Meal Cost : ${totalMeal} </h2>
            </Col>
            <Col>
              <h2> Recommended Meal Budget : ${recCost} </h2>
            </Col>
          </Row>
          <div id="piechart">
            <Row>
              <Col>
                <div>
                  <h1>You have gone over budget!</h1>
                  <ProgressBar>
                    <ProgressBar
                      variant="danger"
                      now={percentLeft}
                      key={1}
                      label="Meal Budget Spent"
                    />
                  </ProgressBar>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      );
    }
  }

  renderCostBar() {
    var percentCost = 0;
    var percentFood = 0;
    let badge = <Badge variant="info"> You Are Under Budget!</Badge>;
    var percenttravel = 0;
    if (this.state.budget != 0) {
      percentCost = this.state.totalexpenses / this.state.budget;
      percentCost *= 100;
      percentCost = Math.round(percentCost);
      if (percentCost > 100) {
        percentCost = 100;
        badge = <Badge variant="danger"> You Are Over Budget</Badge>;
      }

      percenttravel =
        (this.state.minitravel * this.state.numdays) / this.state.budget;
      percenttravel *= 100;
      percenttravel = Math.round(percenttravel);
      if (percenttravel > 100) {
        percenttravel = 100;
        badge = <Badge variant="danger"> You Are Over Budget</Badge>;
      }

      percentFood =
        (this.state.breakfast * this.state.numdays) / this.state.budget;
      percentFood *= 100;
      percentFood = Math.round(percentFood);
      if (percentFood > 100) {
        badge = <Badge variant="danger"> You Are Over Budget</Badge>;
        percentFood = 100;
      }
      if (percenttravel + percentCost + percentFood > 100) {
        badge = <Badge variant="danger"> You Are Over Budget</Badge>;
      }
    }
    var totalwithtravel =
      parseInt(this.state.totalexpenses) +
      (parseInt(this.state.minitravel) +
        parseInt(this.state.breakfast) * parseInt(this.state.numdays) +
        parseInt(this.state.lunch) * parseInt(this.state.numdays) +
        parseInt(this.state.dinner) * parseInt(this.state.numdays) +
        parseInt(this.state.snack) * parseInt(this.state.numdays) +
        parseInt(this.state.other) * parseInt(this.state.numdays));
    return (
      <div className="costs">
        <h2> Current Cost : ${totalwithtravel} </h2>
        {badge}
        <ProgressBar className="progress-bar-costs">
          <ProgressBar
            variant="success"
            now={percentCost}
            key={1}
            label={`${percentCost}%`}
          />
          <ProgressBar
            variant="info"
            now={percentFood}
            key={3}
            label={`${percentFood}%`}
          />

          <ProgressBar
            variant="warning"
            now={percenttravel}
            key={2}
            label={`${percenttravel}%`}
          />
        </ProgressBar>
      </div>
    );
  }

  originalEventModal() {
    if (this.state.currentlyEditingOriginal && !this.state.currentlyEditing) {
      return (
        <OriginalEventModal
          className="activity-modal"
          days={this.state.days}
          saveNewEvent={this.saveNewEvent}
        />
      );
    }
  }

  modalRender() {
    if (this.state.currentlyEditing) {
      return (
        <AddEventModal
          className="activity-modal"
          days={this.state.days}
          saveNewEvent={this.saveNewEvent}
        />
      );
    }
  }

  titleRender() {
    if (this.state.edittitle) {
      return (
        <input
          type="text"
          placeholder={this.state.title}
          onChange={this.handleChange("title")}
        />
      );
    } else {
      return (
        <OverlayTrigger
          key="title"
          placement="top"
          overlay={<Tooltip id="title">Click to Edit</Tooltip>}
        >
          <button className="btn-plain" onClick={this.changeTitle}>
            {" "}
            {this.state.title}{" "}
          </button>
        </OverlayTrigger>
      );
    }
  }

  notesRender() {
    if (this.state.editnotes) {
      return (
        <input
          type="text"
          placeholder={this.state.notes}
          onChange={this.handleChange("notes")}
        />
      );
    } else {
      return <h4> {this.state.notes} </h4>;
    }
  }
  colorRender() {
    if (this.state.editColor) {
      return (
        <input
          type="text"
          placeholder={this.state.color}
          onChange={this.handleChange("color")}
        />
      );
    } else {
      return <h4> {this.state.color} </h4>;
    }
  }

  startRender() {
    if (this.state.editstart) {
      return (
        <input
          type="date"
          placeholder={this.state.startdate}
          onChange={this.handleChange("startdate")}
        />
      );
    } else {
      let day = new Date(this.state.startdate);
      return <> {this.state.startdate}</>;
    }
  }

  endRender() {
    if (this.state.editend) {
      return (
        <input
          type="date"
          placeholder={this.state.enddate}
          onChange={this.handleChange("enddate")}
        />
      );
    } else {
      let day = new Date(this.state.enddate);
      return <> {this.state.enddate} </>;
    }
  }

  locationRender() {
    if (this.state.editlocation) {
      return (
        <input
          type="text"
          placeholder={this.state.location}
          onChange={this.handleChange("location")}
        />
      );
    } else {
      return <>{this.state.location}</>;
    }
  }

  budgetRender(e) {
    if (this.state.editbudget) {
      return (
        <input
          type="number"
          placeholder={this.state.budget}
          onChange={this.handleChange("budget")}
        />
      );
    } else {
      return <>${this.state.budget}</>;
    }
  }
  partySizeRender(e) {
    if (this.state.editpartysize) {
      return (
        <input
          type="number"
          placeholder={this.state.partysize}
          onChange={this.handleChange("partysize")}
        />
      );
    } else {
      return <>{this.state.partysize}</>;
    }
  }

  maxdistRender(e) {
    //alert("Max dist:" + this.state.maxdist + "location:" + this.state.location)
    if (this.state.editmaxdist) {
      return (
        <input
          type="number"
          placeholder={this.state.maxdist}
          onChange={this.handleChange("maxdist")}
        />
      );
    } else {
      return <>{this.state.maxdist}</>;
    }
  }

  locationButtonRender() {
    if (this.state.editlocation) {
      return (
        <Button variant="light" onClick={this.changeLocation}>
          <FiSave />
        </Button>
      );
    } else {
      return (
        <Button variant="light" onClick={this.changeLocation}>
          <FiEdit2 />
        </Button>
      );
    }
  }

  budgetButtonRender() {
    if (this.state.editbudget) {
      return (
        <Button variant="edit" className="edit" onClick={this.changeBudget}>
          <FiSave />
        </Button>
      );
    } else {
      return (
        <></> // <Button variant="light" onClick={this.changeBudget}>
        //<FiEdit2 />
        //</Button>
      );
    }
  }
  handleChangeTab1() {
    alert("made it big");
    this.setState({
      typetab: true,
    });
  }
  handleChangeTab2() {
    alert("made it big");
    this.setState({
      typetab: false,
    });
  }
  tabRender() {
    if (this.state.typetab == false) {
      return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link
                    className="inactive"
                    activeClassName="active"
                    eventKey="first"
                  >
                    Tab 1
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    className="inactive"
                    activeClassName="active"
                    eventKey="second"
                  >
                    Tab 2
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <div className="tabStuff">Day 1</div>
                  <Timetable id="time" />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <div className="tabStuff">Day 2</div>
                  <Timetable id="time" />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      );
    } else {
      return (
        <Tabs
          defaultActiveKey="home"
          transition={false}
          id="noanim-tab-example"
        >
          <Tab eventKey="home" title="Home">
            <div className="tabStuff">Day 1</div>
            <Timetable id="time" />
          </Tab>
          <Tab eventKey="profile" title="Profile">
            <div className="tabStuff">Day 2</div>
            <Timetable id="time" />
          </Tab>
        </Tabs>
      );
    }
  }
  titleButtonRender() {
    if (this.state.edittitle) {
      return (
        <Button variant="light" onClick={this.changeTitle}>
          <FiSave />
        </Button>
      );
    } else {
      //   return(      <Button variant="light" onClick={this.changeTitle}>
      //        <FiEdit2 />
      //        </Button>
      // )
    }
  }
  colorButtonRender() {
    if (this.state.editColor) {
      return (
        <Button variant="light" onClick={this.changeTitle}>
          <FiSave />
        </Button>
      );
    } else {
      //   return(      <Button variant="light" onClick={this.changeTitle}>
      //        <FiEdit2 />
      //        </Button>
      // )
    }
  }
  startButtonRender() {
    if (this.state.editstart) {
      return (
        <Button variant="light" onClick={this.changeStart}>
          <FiSave />
        </Button>
      );
    } else {
      return (
        <Button variant="light" onClick={this.changeStart}>
          <FiEdit2 />
        </Button>
      );
    }
  }

  endButtonRender() {
    if (this.state.editend) {
      return (
        <Button variant="light" onClick={this.changeEnd}>
          <FiSave />
        </Button>
      );
    } else {
      return (
        <Button variant="light" onClick={this.changeEnd}>
          <FiEdit2 />
        </Button>
      );
    }
  }

  newbudget(dailybudget) {
    var newb = dailybudget * this.state.numdays;
    this.setState({
      budget: newb,
    });
  }
  notesButtonRender() {
    if (this.state.editnotes) {
      return (
        <Button variant="light" onClick={this.changeNotes}>
          <FiSave />
        </Button>
      );
    } else {
      return (
        <Button variant="light" onClick={this.changeNotes}>
          <FiEdit2 />
        </Button>
      );
    }
  }

  partySizeButtonRender() {
    if (this.state.editpartysize) {
      return (
        <Button variant="light" onClick={this.changePartySize}>
          <FiSave />
        </Button>
      );
    } else {
      return (
        <Button variant="light" onClick={this.changePartySize}>
          <FiEdit2 />
        </Button>
      );
    }
  }

  maxdistButtonRender() {
    if (this.state.editmaxdist) {
      return (
        <Button variant="light" onClick={this.changeMaxdist}>
          <FiSave />
        </Button>
      );
    } else {
      return (
        <Button variant="light" onClick={this.changeMaxdist}>
          <FiEdit2 />
        </Button>
      );
    }
  }

  changeLocation() {
    if (this.state.editlocation === false) {
      this.setState({
        editlocation: true,
      });
    } else {
      this.setState({
        editlocation: false,
        alreadysaved: false,
      });
    }
  }

  changeBudget() {
    if (this.state.editbudget === false) {
      this.setState({
        editbudget: true,
      });
    } else {
      this.setState({
        editbudget: false,
        alreadysaved: false,
      });
    }
  }

  changeNotes() {
    if (this.state) {
      if (this.state.editnotes === false) {
        this.setState({
          editnotes: true,
        });
      } else {
        this.setState({
          editnotes: false,
          alreadysaved: false,
        });
      }
    }
  }

  changeStart() {
    if (this.state.editstart === false) {
      this.setState({
        editstart: true,
      });
    } else {
      this.calculateDaysAgain();
      this.setState({
        editstart: false,
        alreadysaved: false,
      });
    }
  }

  changeEnd() {
    if (this.state.editend === false) {
      this.setState({
        editend: true,
      });
    } else {
      this.calculateDaysAgain();

      this.setState({
        editend: false,
        alreadysaved: false,
      });
    }
  }

  changeTitle() {
    if (this.state.edittitle === false) {
      this.setState({
        edittitle: true,
      });
    } else {
      this.setState({
        edittitle: false,
        alreadysaved: false,
      });
    }
  }
  changeColor() {
    if (this.state.editColor === false) {
      this.setState({
        editColor: true,
      });
    } else {
      this.setState({
        editColor: false,
        alreadysaved: false,
      });
    }
  }

  changePartySize() {
    if (this.state.editpartysize === false) {
      this.setState({
        editpartysize: true,
      });
    } else {
      this.setState({
        editpartysize: false,
        alreadysaved: false,
      });
    }
  }

  changeMaxdist() {
    if (this.state.editmaxdist === false) {
      this.setState({
        editmaxdist: true,
      });
    } else {
      this.setState({
        editmaxdist: false,
        alreadysaved: false,
      });
    }
  }

  trypush() {
    alert("here77777");
    alert("key is" + this.state.itkey);
    const user = fire.auth().currentUser.uid;
    fire
      .database()
      .ref("itineraries/flight" + user)
      .child(this.state.itkey)
      .push({
        FlightName: "American",
        FlighDate: "12/03/2020",
        FlighTime: "12:00AM",
      });
  }

  renderCheck() {
    if (this.state.alreadysaved) {
      return <FaCheck />;
    }
  }

  onCustomCategory() {
    const curr = this;
    bootbox.prompt({
      title: "Enter a category",
      centerVertical: true,
      callback: function (result) {
        curr.setState({ category: result });
      },
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log("hi");
  }
  addEvent(val) {
    console.log(
      "DATA RECEIVED = " +
        val.name +
        " , duration = " +
        val.time +
        ", date = " +
        val.date
    );
  }
  addCustomEvent(val) {
    console.log(
      "CUSTOM DATA RECEIVED = " +
        val.name +
        " , duration = " +
        val.time +
        ", date = " +
        val.date
    );
  }

  render() {
    const {
      startdate,
      enddate,
      location,
      title,
      budget,
      notes,
      Plate,
      CostH,
      HName,
      costcc,
      plane1n,
      plane1d,
      plane1t,
      plane2n,
      plane2d,
      plane2t,
      plane3n,
      plane3d,
      plane3t,
      countf,
      orange,
      yellow,
      green,
      black,
      purple,
      maroon,
      blue,
      times,
      arial,
      quicksand,
      comic,
      size1,
      size2,
      size3,
      itkey,
    } = this.state;
    const values = {
      startdate,
      enddate,
      title,
      budget,
      location,
      notes,
      Plate,
      CostH,
      HName,
      costcc,
      plane1n,
      plane1d,
      plane1t,
      plane2n,
      plane2d,
      plane2t,
      plane3n,
      plane3d,
      plane3t,
      countf,
      orange,
      yellow,
      green,
      black,
      purple,
      maroon,
      blue,
      times,
      arial,
      quicksand,
      comic,
      size1,
      size2,
      size3,
      itkey,
    };

    //alert("orange is" + this.state.orange)
    let statenow = this;
    const curr = this;

    fire.auth().onAuthStateChanged(function (user) {
      if (user) {
        //console.log("grabbin dests")
        statenow.getDestinations();
      }
    });
    //console.log(this.state.destinations)
    return (
      <div id="form">
        {this.originalEventModal()}
        {this.modalRender()}

        <Jumbotron
          style={{
            textDecoration: "none",
            background: "#FF5E5B",
            color: "white",
          }}
        >
          <h1>
            {this.titleRender()}
            {this.titleButtonRender()}{" "}
          </h1>

          <Container className="trip-info">
            <Row>
              <h3> Trip Details </h3>
            </Row>
            <Row>
              <p> (Click to Edit and Save) </p>
            </Row>

            <Row className="goback" auto>
              <Col>
                <button className="btn-plain" onClick={this.changeLocation}>
                  {" "}
                  <b> Destination: </b>{" "}
                </button>{" "}
                {this.locationRender()}
              </Col>

              <Col>
                <button className="btn-plain" onClick={this.changeBudget}>
                  {" "}
                  <b> Budget:</b>{" "}
                </button>
                {this.budgetRender()}
              </Col>

              <Col>
                <button className="btn-plain" onClick={this.changeStart}>
                  <b>Begin Trip:</b>{" "}
                </button>{" "}
                {this.startRender()}
              </Col>
              <Col>
                <button className="btn-plain" onClick={this.changeEnd}>
                  {" "}
                  <b>End Trip:</b>{" "}
                </button>
                {this.endRender()}
              </Col>
            </Row>

            <Row>
              <Col>
                <MiniTravelCosts handlemini={this.handleMiniTravel} />
              </Col>

              <Col>
                <button className="btn-plain" onClick={this.changePartySize}>
                  {" "}
                  <b> Party Size:</b>{" "}
                </button>{" "}
                {this.partySizeRender()}
              </Col>
              <Col>
                <button className="btn-plain" onClick={this.changeMaxdist}>
                  <b>Maximum Distance (mi): </b>
                </button>{" "}
                {this.maxdistRender()}
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <Col>
                <Accordion defaultActiveKey="1">
                  <Card className="card-notes">
                    <Accordion.Toggle
                      as={Card.Header}
                      variant="link"
                      eventKey="0"
                    >
                      My Notes
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        {this.notesRender()}
                        {this.notesButtonRender()}
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </Col>
            </Row>
            <Row></Row>
          </Container>
        </Jumbotron>

        <Container className="text-dark">
          <Row>
            <Col>{this.renderCostBar()}</Col>
          </Row>
          <Row>
            <div class="sidenav">
              <div class="share-button">
                <EmailShareButton url={window.location.href}>
                  <EmailIcon size={32} round={true} />
                </EmailShareButton>
              </div>
              <div class="share-button">
                <FacebookShareButton url={window.location.href}>
                  <FacebookIcon size={32} round={true} />
                </FacebookShareButton>
              </div>
              <div class="share-button">
                <LineShareButton url={window.location.href}>
                  <LineIcon size={32} round={true} />
                </LineShareButton>
              </div>
              <div class="share-button">
                <LinkedinShareButton url={window.location.href}>
                  <LinkedinIcon size={32} round={true} />
                </LinkedinShareButton>
              </div>
              <div class="share-button">
                <PinterestShareButton url={window.location.href}>
                  <PinterestIcon size={32} round={true} />
                </PinterestShareButton>
              </div>
              <div class="share-button">
                <RedditShareButton url={window.location.href}>
                  <RedditIcon size={32} round={true} />
                </RedditShareButton>
              </div>
              <div class="share-button">
                <TwitterShareButton url={window.location.href}>
                  <TwitterIcon size={32} round={true} />
                </TwitterShareButton>
              </div>
              <div class="share-button">
                <WhatsappShareButton url={window.location.href}>
                  <WhatsappIcon size={32} round={true} />
                </WhatsappShareButton>
              </div>
            </div>
          </Row>
        </Container>

        <Container className="text-dark">
          <Accordion defaultActiveKey="0">
            <Card>
              <Card.Header
                style={{
                  textDecoration: "none",
                  background: "#FF5E5B",
                  color: "white",
                }}
              >
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                  <Link
                    style={{
                      textDecoration: "none",
                      background: "#FF5E5B",
                      color: "white",
                    }}
                  >
                    <span class="ml-12">Accommodation and Travel</span>{" "}
                  </Link>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <div>
                    <Plane1 values={values} />
                    <RentalCar values={values} />
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>

          <Row>
            <Col>
              <h1> Trip Itinerary </h1>
            </Col>
          </Row>
          <Row>
            <Col sm={10} className="schedule">
              <Tabs id="uncontrolled-tab-example">
                {this.state.days.map((day, key) => {
                  return (
                    <Tab
                      className="tabs-internal"
                      eventKey={day.getDate() + day.getMonth()}
                      title={
                        <h5>
                          {" "}
                          {day.getMonth() + 1}/{day.getDate()}/
                          {day.getFullYear()}
                        </h5>
                      }
                    >
                      <div id="cus" className="Custom">
                        <h1>
                          {" "}
                          {day.getMonth() + 1}/{day.getDate()}/
                          {day.getFullYear()}
                          <br />{" "}
                        </h1>

                        <h4>Pick a Background Color</h4>
                        <input
                          id="select1"
                          name="check1"
                          type="checkbox"
                          checked={this.state.black}
                          onClick={this.handleChangeBlack}
                        />
                        <label for="select1">Black</label>
                        <input
                          id="select2"
                          name="check1"
                          type="checkbox"
                          checked={this.state.blue}
                          onClick={this.handleChangeBlue}
                        />
                        <label for="select2">Blue</label>
                        <input
                          id="select3"
                          name="check1"
                          type="checkbox"
                          checked={this.state.green}
                          onClick={this.handleChangeGreen}
                        />
                        <label for="select3">Green</label>
                        <input
                          id="select4"
                          name="check1"
                          type="checkbox"
                          checked={this.state.purple}
                          onClick={this.handleChangePurple}
                        />
                        <label for="select4">Purple</label>
                        <input
                          id="select5"
                          name="check1"
                          type="checkbox"
                          checked={this.state.maroon}
                          onClick={this.handleChangeMaroon}
                        />
                        <label for="select5">Maroon</label>
                        <input
                          id="select6"
                          name="check1"
                          type="checkbox"
                          checked={this.state.orange}
                          onClick={this.handleChangeOrange}
                        />
                        <label for="select6">Orange</label>
                        <input
                          id="select7"
                          name="check1"
                          type="checkbox"
                          checked={this.state.yellow}
                          onClick={this.handleChangeYellow}
                        />
                        <label for="select7">Yellow</label>
                        <div className="fontnames">
                          <h4>Pick a Font</h4>
                          <input
                            id="sel3"
                            name="check1"
                            type="checkbox"
                            checked={this.state.arial}
                            onClick={this.handleChangeArial}
                          />
                          <label for="sel3">Arial</label>
                          <input
                            id="sel4"
                            name="check1"
                            type="checkbox"
                            checked={this.state.comic}
                            onClick={this.handleChangeComic}
                          />
                          <label for="sel4">Comic Sans</label>
                          <input
                            id="sel5"
                            name="check1"
                            type="checkbox"
                            checked={this.state.times}
                            onClick={this.handleChangeTimes}
                          />
                          <label for="sel5">Times </label>
                        </div>
                        <h4>Pick a Font Size</h4>
                        <input
                          id="se1"
                          name="check1"
                          type="checkbox"
                          checked={this.state.size1}
                          onClick={this.handleChangeSize1}
                        />
                        <label for="se1">12</label>
                        <input
                          id="se3"
                          name="check1"
                          type="checkbox"
                          checked={this.state.size2}
                          onClick={this.handleChangeSize2}
                        />
                        <label for="se3">24</label>
                        <input
                          id="se4"
                          name="check1"
                          type="checkbox"
                          checked={this.state.size3}
                          onClick={this.handleChangeSize3}
                        />
                        <label for="se4">30</label>

                        <div class="saveColors">
                            <h2>Save</h2> 
                          <h3>
                            {this.titleRender()}
                            {this.titleButtonRender()}{" "}
                          </h3>
                        </div>

                        <div id="cuse" class="wrapper2 wrap wr w">
                          <Timetable
                            daynum={key}
                            delete={this.deleteOldEvent}
                            travel={this.state.minitravel}
                            food={this.state.breakfast}
                            newbudget={this.newbudget}
                            times={this.state.dailydata[key]}
                            budget={this.state.budget}
                            days={this.state.numdays}
                          />
                        </div>
                      </div>
                      <div className="MealsStuff" id="moreMealStuff">
                        <Snack lailafunc={this.handleAddSnack} />
                        <Other lailafunc={this.handleAddOther} />
                        <Dinner lailafunc={this.handleAddDinner} />
                        <Lunch lailafunc={this.handleAddLunch} />
                        <Breakfast lailafunc={this.handleAddBreakfast} />
                        {this.renderTotalMealCost()}
                      </div>
                    </Tab>
                  );
                })}
              </Tabs>
            </Col>
            <Col sm={2}>
              <Row>
                <h1> Discover </h1>
                <Accordion defaultActiveKey="0">
                  <Card
                    style={{
                      height: "100%",
                      width: "343px",
                    }}
                  >
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                      Suggested Attractions
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <div className="itAttr">
                          <Container>
                            <Row>
                              <Col>
                                <p>Category:</p>
                              </Col>

                              <Col>
                                <DropdownButton
                                  as={InputGroup.Append}
                                  variant="outline-secondary"
                                  title={curr.state.category}
                                  id="input-group-dropdown-2"
                                  onSelect={function (evt) {
                                    curr.setState({ category: evt });
                                  }}
                                >
                                  <Dropdown.Item eventKey="Restaurants">
                                    Restaurants
                                  </Dropdown.Item>
                                  <Dropdown.Item eventKey="Attractions">
                                    Attractions
                                  </Dropdown.Item>
                                  <Dropdown.Divider />
                                  <Dropdown.Item
                                    onClick={this.onCustomCategory}
                                  >
                                    Custom
                                  </Dropdown.Item>
                                </DropdownButton>
                              </Col>
                            </Row>
                          </Container>

                          <Attractions
                            category={curr.state.category}
                            location={curr.state.location}
                            budget={this.state.budget}
                            partysize={this.state.partysize}
                            addedAttraction={this.addEvent}
                            handleAdd={this.handleEventAdd}
                            title={this.state.title}
                          />


                        </div>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>

                <Accordion defaultActiveKey="0">
                  <Card
                    style={{
                      height: "100%",
                      width: "343px",
                    }}
                  >
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                      User-Submitted Attractions
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>

                        <Custom addedAttraction={this.addCustomEvent} handleAdd={this.handleEventAdd}/>

                        <Button
                          className="btn-event"
                          onClick={this.handleOriginalAdd}
                          style={{ margin: "10px" }}
                        >
                          {" "}
                          Add Your Own Event{" "}
                        </Button>

                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>

                {/* <PreviewAttractions
                  handleAdd={this.handleEventAdd}
                  budget={this.state.budget}
                  location={this.state.location}
                  itkey={this.state.itkey}
                  title={this.state.title}
                  partysize={this.state.partysize}
                />  */}
              </Row>
            </Col>
            <MapAll
              destinations={this.state.destinations}
              maxdist={this.state.maxdist}
            />
          </Row>
          <Row>
            <Col>
              <Button onClick={this.handleSavedEdits()}> Save </Button>
            </Col>
            <Col>{this.renderCheck()}</Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default GenerateItinerary;
