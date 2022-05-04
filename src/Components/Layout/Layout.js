import React, { Component } from "react";
import Auxilary from "../../hoc/Auxilary";
import "./Layout.css";
import Toolbar from "./Toolbar/Toolbar";
import BurgerBuilder from "../../Container/BurgerBuilder/BurgerBuilder";
import SideDrawer from "./SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    sideDraw: false,
  };

  sideDrawOpenHandler = () => {
    this.setState({ sideDraw: true });
  };

  sideDrawCloseHandler = () => {
    this.setState({ sideDraw: false });
    console.log("Closed");
  };



  render() {
    return (
      <Auxilary>
        <SideDrawer
          onClose={this.sideDrawCloseHandler}

          sideDraw={this.state.sideDraw}
        />
        <Toolbar onOpen={this.sideDrawOpenHandler} />
        <div className={"layout"}>
          <BurgerBuilder  {...this.props}/>
        </div>
      </Auxilary>
    );
  }
}

export default Layout;
