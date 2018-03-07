import React, { Component } from "react";
// import Radium, { StyleRoot } from "radium";
import "./App.css";
import Person from "./Person/Person";

class App extends Component {
  state = {
    persons: [
      {id: "<333", name: "Jackie", age: 5},
      {id: "tulpa", name: "Cyan", age: 4},
      {id: "host", name: "Rainbow", age: 36}
    ],
    otherState: "some other value",
    showPersons: false
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice(); // slice() copies array
    const persons = [...this.state.persons]; // So does spread into a new array
    persons.splice(personIndex,1);
    this.setState({persons: persons});
  }

  nameChangedHandler = (event, id) => {
    const person_index = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {...this.state.persons[person_index]};
    // const person = Object.assign({},this.state.persons[person_index]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[person_index] = person;


    // this.setState({persons: persons});
    this.setState({persons}); // ES6: Variable name = object name

  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {
    const style = {
      backgroundColor: "green",
      color: "white",
      font: "inherit",
      border: "1px solid blue",
      padding: "8px",
      cursor: "pointer",
      // ":hover": {
      //   backgroundColor: "lightgreen",
      //   color: "black"
      // }
    };

    let persons = null;

    if(this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return(
              <Person
                click = {() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                changed={(event) => this.nameChangedHandler(event, person.id)}
              />);
          })}
        </div>
      );
      style.backgroundColor = "red";
      style[":hover"] = {
        backgroundColor: "salmon",
        color: "black"
      };
    }

    const classes = [];
    if(this.state.persons.length <= 2) classes.push("red");
    if(this.state.persons.length <= 1) classes.push("bold");

    return (
      // <StyleRoot>
        <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p className={classes.join(" ")}>This is really working!</p>
          <button
            style={style}
            onClick={this.togglePersonsHandler}>
            Toggle Persons
          </button>
          {persons}

        </div>
      // </StyleRoot>
    );
    // return React.createElement("div", null, React.createElement("h1", {className: "App"}, "I'm a react app!!!"));
  }
}

export default App;
