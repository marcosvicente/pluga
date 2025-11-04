class SnippetsController < ApplicationController
  before_action :set_proponent, only: %i[ show ]

  def index
    @snippts = Snippet.all
  end

  def show
  end

  def create
    params = GeneratSnippet::SumaryAIService.call(snippet_params[:text])
    @snippt = Snippet.new(params)

    if @snippt.save
      render json: @snippt, status: :unprocessable_entity

    else
      ender json: @snippt.errors, status: :unprocessable_entity
    end
  end

  private
  def set_proponent
    @snippet = Snippet.find(params[:id])
  end

  def snippet_params
    params.require(:snippet).permit(:text)
  end
end
