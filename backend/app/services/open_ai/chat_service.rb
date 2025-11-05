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
      client.chat(
        parameters: {
          model: DEFAULT_MODEL,
          messages: [{ role: "user", content: message }],
          temperature: 0.7
        }
      )
    end
  end
end
