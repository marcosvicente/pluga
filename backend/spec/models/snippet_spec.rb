require 'rails_helper'

RSpec.describe Snippet, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:text) }
    it { should validate_presence_of(:summary) }
  end
end
