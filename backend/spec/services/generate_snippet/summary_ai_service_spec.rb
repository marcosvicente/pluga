require 'rails_helper'

RSpec.describe GenerateSnippet::SummaryAiService, type: :service do
  describe "#call" do
    let(:text) { "How to go to the moon" }
    let(:response_convert) { "With tesla"}

    before do
      allow(OpenAi::ChatService).to receive(:call).and_return(response_convert)
    end

    it "should be return text and summary from openAI integration" do

      klass = described_class.new("test").call
      expect(klass[:text]).to_not be_empty
      expect(klass[:summary]).to_not be_empty
    end
  end
end