module Api::V1
  class PlansController < ApplicationController

    def index
      render json: Plan.all
    end

    def show
    end


    def create
    end

    def update
    end

    def my_plans
      user_plans = UserPlan.select{|plan| plan.user_id.to_s == params[:user_id]}
      @plans = []
      user_plans.each{|plan| @plans << Plan.find(plan.plan_id)}
      if @plans
        render json: @plans
      else
        render json: true, :status => :not_found
      end
    end

    def past_plans
    end

    private

    def plans_params
      params.require(:plan).permit(:title, :user)
    end


  end


end
