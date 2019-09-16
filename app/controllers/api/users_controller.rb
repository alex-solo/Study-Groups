class Api::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  # GET api/users
  def index
    users = User.all.includes(:groups)
    
    render json: users, include: {groups: {only: :name}}
  end
  
  # GET api/users/:id
  def show
    user = User.find(params[:id])
    render json: user
  
    rescue ActiveRecord::RecordNotFound
    render json: {status: "NOT FOUND", message: "User with that id could not be found"}, status: :not_found
  end
  
  # POST api/users
  def create
    user = User.new(user_params)
    
    if params[:groups]
      params[:groups].each do |group|
        user.groups << Group.find_by_name(group)
      end
    end
    
    if user.save
      render json: user, include: {groups: {only: :name}}
    else
      render json: {status: "ERROR", message: "User not saved", data: user.errors}, status: :unprocessable_entity
    end
  
    rescue ActionController::ParameterMissing
    render json: {status: "ERROR", message: "Invalid user data provided"}, status: :unprocessable_entity
  end

  # DELETE api/users/:id
  def destroy
    user = User.find(params[:id])
    user.destroy
    render json: user
  
    rescue ActiveRecord::RecordNotFound
    render json: {status: "NOT FOUND", message: "User with that id could not be found"}, status: :not_found
  end

  # PUT api/users/:id
  def update
    user = User.find(params[:id])

    if user.update(user_params)
      render json: user
    else
      render json: {status: "ERROR", message: "User not updated", data: user}, status: :unprocessable_entity
    end
  
    rescue ActionController::ParameterMissing
    render json: {status: "ERROR", message: "Invalid user data provided"}, status: :unprocessable_entity
  end
  
  private
  
  def user_params
    params.require(:user).permit(:name, :email)
  end
end