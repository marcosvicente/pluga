module OpenAi
  class ChatService
    DEFAULT_MODEL = "gpt-3.5-turbo"

    attr_reader :message

    def initialize(message)
      @message = message
    end

    def self.call(message)
      new(message).call
    end

    def call
      chat_response
    end

    private

    def client
      @client ||= OpenAI::Client.new
    end

    def chat_response
      response = client.chat(
        parameters: {
          model: DEFAULT_MODEL,
          messages: [{ role: "assistant", content: message }],
          temperature: 0.7
        }
      )

      response.dig("choices", 0, "message", "content")
    end

  end
end
