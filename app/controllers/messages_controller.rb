class MessagesController < ApplicationController

  def index
    @messages = Message.all
  end

  def create
    @message = Message.create(body: message_params[:body], image: message_params[:image])
  end

  private
  def message_params
    params_permit(:body, :image)
  end
end
