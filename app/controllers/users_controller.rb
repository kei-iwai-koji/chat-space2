class UsersController < ApplicationController

  def index
  end

  def edit
  end

  def update
    if current_user.update(user_params) #current_user.updateに成功した場合
      redirect_to root_path
    else #失敗した場合
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
