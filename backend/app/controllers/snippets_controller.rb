class SnippetsController < ApplicationController
  before_action :set_snippet, only: %i[ show ]

  def index
    @snippets = Snippet.all
    render json: @snippets, status: :ok
  end

  def show
    render json: @snippet, status: :ok
  end

  def create
    ai_result = GenerateSnippet::SummaryAiService.call(snippet_params[:text])

    @snippet = Snippet.new(ai_result.to_h)

    if @snippet.save
      render json: @snippet, status: :created
    else
      render json: { errors: @snippet.errors }, status: :unprocessable_entity
    end
  end

  private

  def set_snippet
    @snippet = Snippet.find(params[:id])
  end

  def snippet_params
    params.require(:snippet).permit(:text)
  end
end
