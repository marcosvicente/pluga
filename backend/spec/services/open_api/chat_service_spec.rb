require 'rails_helper'

RSpec.describe OpenAI::ChatService, type: :service do

  describe "#call" do
    it "should be return message from openAI integration" do
      klass = described_class.new("test").call
      binding.pry
      expect(klass).to_not be_empty
      expect(klass).to_not be_empty
    end
  end
end