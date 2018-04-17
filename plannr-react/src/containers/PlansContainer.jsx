import React from 'react'

import MyPlansContainer from './MyPlansContainer'
import AllPlansContainer from './AllPlansContainer'
import PlanDetailsContainer from './PlanDetailsContainer'
import NewPlanForm from './NewPlanForm'
// import EditPlanForm from './EditPlanForm'

export default class PlansContainer extends React.Component {
  findAndLeaveUserPlan = () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user_id: parseInt(localStorage.user, 10),
        plan_id: this.props.toggledPlan
      })
    }

    fetch(`http://localhost:3000/api/v1/user_plans/find`, options)
    .then(res => res.json())
    .then(json => {
      this.deleteUserPlan(json)
      this.props.pushNotJoinedPlans(json)
    })
  }

  deleteUserPlan = (json) => {
    const options = {
      method: "DELETE"
    }
    fetch(`http://localhost:3000/api/v1/user_plans/${json.id}`, options)
    .then(res => this.props.setToggled("none", 0))
  }

  renderSideBarContent = () => {
    if (this.props.toggledView === "none") {
      return null;
    } else if (this.props.toggledView === "new") {
      return this.renderNewPlanForm();
    } else if (this.props.toggledView === "edit") {
      return this.renderEditPlanForm();
    } else if(this.props.toggledView === "detail" && this.props.toggledPlan > 0 ) {
      return this.renderPlanDetails()
    }
  }

  renderNewPlanForm = () => {
    return <NewPlanForm setToggled={this.props.setToggled} />
  }

  renderEditPlanForm = () => {

  }

  renderPlanDetails = () => {
    return <PlanDetailsContainer
      allPlans={this.props.allPlans}
      myPlans={this.props.myPlans}
      toggledView={this.props.toggledView}
      toggledPlan={this.props.toggledPlan}
      findAndLeavePlan={this.findAndLeaveUserPlan}
      setToggled={this.props.setToggled}
      pushJoinedPlans={this.props.pushJoinedPlans} />
  }


  render() {
    return (
      <div>
        <div style={ this.props.toggledView === "none" ? null : {"float":"left"} }>
          My Plans:
          {<MyPlansContainer myPlans={this.props.myPlans} setToggled={this.props.setToggled} />}
          <br/>
          All Plans:
          {<AllPlansContainer myPlans={this.props.myPlans} allPlans={this.props.allPlans} notJoinedPlans={this.props.notJoinedPlans} setToggled={this.props.setToggled} pushJoinedPlans={this.props.pushJoinedPlans} />}
          <br />
        </div>
        {this.renderSideBarContent()}
      </div>
    )
  }
}
