module GeneratSnippet
    class SumaryAIService
      def initialize(text)
        @text = text
      end

      def call
        Struct.new(text: text, summary: response_open_ai)
      end

      private
      def response_open_ai
        OpenAI::ChatService.new(@text).call
      end
    end
end