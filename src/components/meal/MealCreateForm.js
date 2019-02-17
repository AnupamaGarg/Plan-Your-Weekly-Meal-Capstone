import React, { Component } from "react"
import "./meal.css"


export default class MealCreateForm extends Component {
    // Set initial state
    state = {
        breakFast: "",
        lunch: "",
        dinner: "",
        dayId: "",
        userId:JSON.parse(sessionStorage.getItem("userInfo")).userId,
        mealOftheDay: ""


    };

    clearFields=()=>{
        document.querySelector("#breakFast").value="";
        document.querySelector("#lunch").value="";
        document.querySelector("#dinner").value="";
        
        this.setState({
        groceryName: "",
        quantity: "",
        store: "",
        typeId: ""
        })
      }






    handleFieldChange = evt => {
        const stateToChange = {}
        console.log(evt.target.id, evt.target.value);

        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }
    handleDropDownChange = evt => {
        const stateToChange = {}
        console.log(evt.target.value)

        // if (this.props.meals.find(e => e.dayId == evt.target.value)) {
        //     window.alert("you will replace the existing meal for this day when you click save")
        //     let id = evt.target.value
            

        //     fetch(`http://localhost:5002/meals?dayId=${id}`).then(e => e.json())
        //     // fetch(`http://localhost:5002/days/?_embed=meals`).then(e => e.json())

        //         .then(mealsOftheDay => {this.props.deleteMeal(mealsOftheDay[0].id)})
        //         .then(ChangedmealsOftheDay => console.log(ChangedmealsOftheDay))


            //         this.setState({
            //             mealOftheDay: mealOftheDay


                    // })})
    
            
                    //  .then(()=>console.log())
                    

                // }




       




        stateToChange[evt.target.id] = parseInt(evt.target.value)
        this.setState(stateToChange)
        // console.log(this.state.mealOftheDay.meals.id)
        // if(confirm("Want to delete?"))
    
    }

        constructNewMeal = evt => {
            evt.preventDefault()
            if (this.state.dayId === "") {
                window.alert("Please select the day")
            }
            else if(this.props.meals.find(e => e.dayId == this.state.dayId)) {
                window.confirm("it will replace the existing meal for this day")

                
                let id = this.state.dayId
                
                
                fetch(`http://localhost:5002/meals?dayId=${id}`).then(e => e.json())
                // fetch(`http://localhost:5002/days/?_embed=meals`).then(e => e.json())
                
                .then(mealsOftheDay => {this.props.deleteMeal(mealsOftheDay[0].id)})
                .then(ChangedMealOftheDay => console.log(ChangedMealOftheDay))
            }
              {
                const meal = {
                    breakFast: this.state.breakFast,
                    lunch: this.state.lunch,
                    dinner: this.state.dinner,
                    dayId: this.state.dayId,
                    userId:this.state.userId
                    // userId:JSON.parse(sessionStorage.getItem("userInfo")).userId
                    

                }
                console.log("Gives the meal object", meal)
                this.props.addMeal(meal)
                .then (()=> this.clearFields())
                .then(() => this.props.history.push("/meal"))
            }
        }
        render() {
            console.log(this.props.days)
            return (
                <React.Fragment>
                    {/* <div>
                 <fieldset>
                    <label>BreakFast</label>
                    <input type="text" onChange={this.handleFieldChange} id ="bf" value = {this.state.breakFast}>
                </fieldset>
            </div> */}

                    <form className="CreateMealForm">
                    <div className= "mCreateDiv">
                        <div><b>Create Meal</b></div>
                        <div className="form-group">
                            <select required
                                className="form-control"
                                onChange={this.handleDropDownChange}
                                id="dayId">
                                <option value="">Select Day</option>
                                {this.props.days.map(e => (
                                    <option key={e.id} value={e.id}>
                                        {e.name}
                                    </option>
                                ))}
                            </select>




                        </div>
                        <div
                            className="form-group">
                            <label htmlFor="breakFast">BreakFast</label>
                            <input maxlength="25"
                                type="text" required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="breakFast"

                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Lunch">Lunch</label>
                            <input maxlength="25"
                                type="text" required
                                className="form-control"

                                onChange={this.handleFieldChange}
                                id="lunch"

                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="url">Dinner</label>
                            <input maxlength="25"
                                type="text" required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="dinner"

                            />




                        </div>



                        <button type="Submit"
                            onClick={this.constructNewMeal} className="btn btn-primary">
                            save</button>

                   </div>
                    </form>
                </React.Fragment>
            )
        }
    }