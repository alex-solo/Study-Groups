class Api::GroupsController < ApplicationController
  skip_before_action :verify_authenticity_token
  # GET api/groups
  def index
    groups = Group.all.includes(:users)
    render json: groups, include: :users
  end
  
  # GET api/groups/:id
  def show
    group = Group.find(params[:id])
    render json: group
  
    rescue ActiveRecord::RecordNotFound
    render json: {status: "NOT FOUND", message: "Group with that id could not be found"}, status: :not_found  
  end
  
  # POST api/groups
  def create
    group = Group.new(group_params)
  
    if group.save
      render json: group, include: :users
    else
      render json: {status: "ERROR", message: "Group not saved", data: group.errors}, status: :unprocessable_entity
    end

    rescue ActionController::ParameterMissing
    render json: {status: "ERROR", message: "Invalid group data provided"}, status: :unprocessable_entity
  end

  # DELETE api/groups/:id
  def destroy
    group = Group.find(params[:id])
    group.destroy
    render json: group
  
    rescue ActiveRecord::RecordNotFound
    render json: {status: "NOT FOUND", message: "Group with that id could not be found"}, status: :not_found  
  end

  # PUT api/groups/:id
  def update
    group = Group.find(params[:id])

    if group.update(group_params)
      render json: group, include: :users
    else
      render json: {status: "ERROR", message: "Group not updated", data: group}, status: :unprocessable_entity
    end
    
    rescue ActionController::ParameterMissing
    render json: {status: "ERROR", message: "Invalid group data provided"}, status: :unprocessable_entity
  end
  
  private
  
  def group_params
    params.require(:group).permit(:name, :description)
  end
end