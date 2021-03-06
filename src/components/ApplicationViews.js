import { Route, Redirect } from "react-router-dom";
import Register from './authentication/Register'
import Login from './authentication/Login'
import React, { Component } from "react";
import MealCreateForm from './meal/MealCreateForm'
import GroceryCreateForm from './grocery/GroceryCreateForm'
import MealList from './meal/MealList'
import GroceryList from './grocery/GroceryList'
import MealEditForm from './meal/MealEditForm'
import GroceryEditForm from './grocery/GroceryEditForm'
import MealManager from './dataManager/MealManager'
import GroceryManager from './dataManager/GroceryManager'

import Home from './Home/Home'
import ReactToPrint from "react-to-print"
import "./meal/meal.css"



import "./WeeklyPlanner.css"

export default class ApplicationViews extends Component {

  state = {
    meals: [],
    days: [],
    groceries: [],
    types: [],
    userId: sessionStorage.getItem("userInfo")
    // userId: JSON.parse(sessionStorage.getItem("userInfo")).userId
}



  

  getloggedUserMealsGroceries=()=>{
    MealManager.getAll()
    .then(allMeals => this.setState({meals:allMeals}))
         
    GroceryManager.getAll()
      .then(allgroceries => this.setState({groceries:allgroceries}))

    
  }

  



  isAuthenticated = () =>
    // localStorage.getItem("userInfo") !== null ||
    sessionStorage.getItem("userInfo") !== null

  componentDidMount() {
    const newState = {}
    fetch("http://localhost:5002/days")
      .then(r => r.json())
      .then(alldays => newState.days = alldays)
      .then(() => this.setState(newState))
    // fetch("http://localhost:5002/meals?_expand=day&_sort=dayId")
    // .then(r => r.json())

    
   
    // MealManager.getAll()
    //   .then(allMeals => newState.meals = allMeals)
    //   .then(() => this.setState(newState))
    // console.log(newState)
    
    

    fetch("http://localhost:5002/types")
      .then(r => r.json())
      .then(allTypes => newState.types = allTypes)
      .then(() => this.setState(newState))

    // fetch("http://localhost:5002/groceries?_expand=type")
    // .then(r => r.json())
  //   GroceryManager.getAll()
  //     .then(allgroceries => newState.groceries = allgroceries)
  //     .then(() => this.setState(newState))
  //   console.log(newState)

    

  }
  //////// DB calls Meal////////////////
  deleteMeal = id => MealManager.delete(id)
    .then(() => MealManager.getAll())
    .then(allMeals => this.setState({
      meals: allMeals
    })
    )

  newMeal = (meal) => MealManager.post(meal)
    .then(() => MealManager.getAll())
    .then(allMeals => this.setState({
      meals: allMeals

    })
    )

  updateMeal = (mealId, editedMealObj) => {
    return MealManager.put(mealId, editedMealObj)
      .then(() => MealManager.getAll())
      .then(allMeals => {
        this.setState({
          meals: allMeals
        })
      });
  }

  ////////////  DB calls Grocery //////

  newGrocery = (newGrocery) => GroceryManager.post(newGrocery)
    .then(() => GroceryManager.getAll())
    .then(allGroceries => this.setState({
      groceries: allGroceries
    })
    )

  deleteGrocery = id => GroceryManager.delete(id)
    .then(() => GroceryManager.getAll())
    .then(allGroceries => this.setState({
      groceries: allGroceries
    })
    )


  updateGrocery = (groceryId, editedGroceryObj) => {
    return GroceryManager.put(groceryId, editedGroceryObj)
      .then(() => GroceryManager.getAll())
      .then(allGroceries => {
        this.setState({
          groceries: allGroceries
        })
      });
  }


  render() {
    console.log(this.state)
    return (
      <React.Fragment >
        
        <Route exact path="/" render={props => {
          return <Home {...props}/>
        }} />

        <Route exact path="/Login" render={props => {
          return <Login  {...props}
          getloggedUserMealsGroceries={this.getloggedUserMealsGroceries}
          />
        }} />

        <Route exact path="/Register" render={props => {
          return <Register {...props} />
        }} />

        <Route exact path="/meal" render={props => {
          if (this.isAuthenticated()) {
            return <React.Fragment>
           <div 
          //  style={{backgroundImage: "url(" + cherry + ")"}}
           className="mealComponent">
              <MealCreateForm className="div" {...props}
                addMeal={this.newMeal}
                days={this.state.days}
                meals={this.state.meals}
                deleteMeal={this.deleteMeal} />


              <div className="printList">  <ReactToPrint trigger={() => <a  href="#"className="printLink">Print</a>}
                content={() => this.componentRef}/>

              <MealList className="div" {...props}{...this.props}
                meals={this.state.meals}
                deleteMeal={this.deleteMeal} 
                ref={el => (this.componentRef = el)}
                />
                </div>
    </div>
            </React.Fragment>
          } else {
            return <Redirect to="/Login"/>
              }
            }} />
    
    
    
        <Route
                path="/meal/:mealId(\d+)/edit" render={props => {
                  return <MealEditForm {...props}
                    meals={this.state.meals}
                    days={this.state.days}
                    updateMeal={this.updateMeal} />
                }}
              />

              <Route
                exact path="/grocery"
                render={props => {
                  if (this.isAuthenticated()) {
                  return <React.Fragment>
                    <div className="groceryComponent">
                    <GroceryCreateForm className="div" {...props}
                      addGrocery={this.newGrocery}
                      types={this.state.types}

                    />
                    <GroceryList className="div" {...props}{...this.props}
                      groceries={this.state.groceries}
                      deleteGrocery={this.deleteGrocery}
                      types={this.state.types} />
                      </div>
                  </React.Fragment>
                  } else {
                    return <Redirect to="/Login"/>
                      }
                }} />
              <Route
                path="/grocery/:groceryId(\d+)/edit" render={props => {
                  return <GroceryEditForm {...props}
                    // groceries={this.state.groceries} 
                    types={this.state.types}
                    updateGrocery={this.updateGrocery} />
                }}
              />









      </React.Fragment>
    )
  }
}