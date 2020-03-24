import React, { Component } from "react";
import ReactDOM from "react-dom";
import TimePicker from 'react-times';
import {Button, Jumbotron, Table, Tabs,Tab, TabPane, Accordion,Card, Container, Row, Col,
    Nav, NavItem, NavLink } from 'react-bootstrap'
// use material theme
import 'react-times/css/material/default.css';
// or you can use classic theme
import 'react-times/css/classic/default.css';
  
export class TimeInput2 extends Component {

    
    constructor(props) {
        super(props);
        const { defaultTime, meridiem, focused, showTimezone, timezone } = props;
        let hour = '';
        let minute = '';
        
    
        this.state = {
          hour,
          minute,
          meridiem,
          focused,
          timezone,
          showTimezone,
        };
    
        this.onFocusChange = this.onFocusChange.bind(this);
        this.onTimeChange = this.onTimeChange.bind(this);
        this.handleFocusedChange = this.handleFocusedChange.bind(this);
      }
    
      onTimeChange(options) {
        const {
          hour,
          minute,
          meridiem
        } = options;
        console.log(hour)
        console.log(minute)
        this.setState({ hour, minute, meridiem });
        
      }
    
      onFocusChange(focused) {
        console.log(`onFocusChange: ${focused}`);
        this.setState({ focused });
      }
    
      handleFocusedChange() {
        const { focused } = this.state;
        this.setState({ focused: !focused });
      }
    
      get basicTrigger() {
        const { hour, minute } = this.state;
        return (
          <div
            onClick={this.handleFocusedChange}
            className="time_picker_trigger"
          >
            <div>
              Click to open panel<br />
              {hour}:{minute}
            </div>
          </div>
        );
      }
    
      get customTrigger() {
        return (
          <div
            onClick={this.handleFocusedChange}
            className="time_picker_trigger"
          >
            
          </div>
        );
      }
    
      get trigger() {
        const { customTriggerId } = this.props;
        const triggers = {
          0: (<div />),
          1: this.basicTrigger,
          2: this.customTrigger
        };
        return triggers[customTriggerId] || null;
      }
    
      render() {
        const {
          hour,
          minute,
          focused,
          meridiem,
          timezone,
          showTimezone,
        } = this.state;
    
        return (
          <div id="timeeee" className="time_picker_wrapper">
            <TimePicker
              timeMode="12"
              theme="classic"
              colorPalette="dark"
              trigger={this.trigger}
              {...this.props}
              focused={focused}
              meridiem={meridiem}
              timezone={timezone}
              onFocusChange={this.onFocusChange}
              onTimeChange={this.onTimeChange}
              showTimezone={showTimezone}
              time={hour && minute ? `${hour}:${minute}` : null}
            />
          </div>
           
        );
      }
    }
     
export default TimeInput2;