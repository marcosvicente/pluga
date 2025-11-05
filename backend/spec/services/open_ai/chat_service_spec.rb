require 'rails_helper'

RSpec.describe OpenAi::ChatService, type: :service  do
  describe "#call" do
    let(:client) { instance_double(OpenAI::Client) }
    let(:text) { "How to go to the moon" }
    let(:response_convert) { {
      "choices" => [
        { "message" => { "content" => "With tesla" } }
      ]
    }
    }

    before do
      allow(OpenAI::Client).to receive(:new).and_return(client)
      allow(client).to receive(:chat).and_return(response_convert)

    end

    it "should be return message from openAI integration" do
      result = described_class.call("test")
      expect(result).to be_present
    end
  end
end