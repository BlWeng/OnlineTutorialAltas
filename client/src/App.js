import React, { Component } from 'react';
import Header from './components/header';
import Cards from './components/cards';
import Search from './components/search';
import Footer from './components/footer';


// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";

// Project for the education application of tutoring systems
import Create_tutor from "./components/create_tutor";
import Create_appointment from "./components/create_appointment";
import RecordList_tutor from './components/recordList_tutor';
import RecordList_appointment from "./components/recordList_appointment";
import Edit_tutor from "./components/edit_tutor";
import Edit_appointment from "./components/edit_appointment";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      availableOnly: false,
      tutors: [],
      focusView: false,
      focusCardId: 0
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handlFocusCardChange = this.handlFocusCardChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  handlFocusCardChange(key) {
    this.setState({
      focusView: !this.state.focusView,
      focusCardId: parseInt(key[key.length - 1])
    })
  }

  componentDidMount() {
    //fetch('./tutors.json', {
    fetch('http://localhost:3000/record', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then((data) => {
        this.setState({ tutors: data })
      })
      .catch(console.log)
  }

  render() {
    const isFocusView = this.state.focusView;
    let block;
    if (isFocusView) {
      block = (<div className="container col-10 p-4 mt-4">
      <Cards
        tutorList={this.state.tutors}
        filterText={this.state.filterText}
        availableOnly={this.state.availableOnly}
        onFocusCardChange={this.handlFocusCardChange}
        focusView={this.state.focusView}
        focusCardId={this.state.focusCardId}
      />
    </div>);
    } else {
      block = (<div className="container col-10 p-4 mt-4">
      <Search
        filterText={this.state.filterText}
        availableOnly={this.state.availableOnly}
        onFilterTextChange={this.handleFilterTextChange}
        onAvailableChange={this.handleAvailableChange}
        focusView={this.state.focusView}
      />
      <Cards
        tutorList={this.state.tutors}
        filterText={this.state.filterText}
        availableOnly={this.state.availableOnly}
        onFocusCardChange={this.handlFocusCardChange}
        focusView={this.state.focusView}
        focusCardId={this.state.focusCardId}
      />
    </div>);
    }
    return (
      <div>
        <Header />
        <Navbar />
          <Routes>
            <Route path="/" element={<RecordList />} />
            <Route path="/recordList_tutor" element={<RecordList_tutor />} />
            <Route path="/recordList_appointment" element={<RecordList_appointment />} />
         
            <Route path="/create_tutor" element={<Create_tutor />} />
            <Route path="/create_appointment" element={<Create_appointment />} />
            <Route path="/create" element={<Create />} />

            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/edit_tutor/:id" element={<Edit_tutor />} />
            <Route path="/edit_appointment/:id" element={<Edit_appointment />} />
          </Routes>   
          {block}
        <Footer />
      </div>

    );

  }
}


export default App;