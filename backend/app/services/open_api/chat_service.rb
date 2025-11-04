module OpenAI
  class ChatService
    def initialize(message)
      @message = message
    end

    def call
      get_client
      response_chat
    end

    def get_client
      @client = OpenAI::Client.new
    end

    def response_chat
    response = @client.chat(
      parameters: {
        model: "gpt-3.5-turbo", # Required.
        messages: [{ role: "user", content: @message}], # Required.
        temperature: 0.7,
      })
    end
  end
end