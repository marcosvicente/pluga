module GenerateSnippet
  class SummaryAiService
    Result = Struct.new(:text, :summary, keyword_init: true)

    attr_reader :text

    def initialize(text)
      @text = text
    end

    def self.call(text)
      new(text).call
    end

    def call
      Result.new(text: text, summary: fetch_summary)
    end

    private

    def fetch_summary
      OpenAi::ChatService.call(text)
    end
  end
end
