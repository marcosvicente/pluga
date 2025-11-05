require 'rails_helper'

RSpec.describe "Snippets", type: :request do
  describe 'GET /index' do
    let(:snippets) { create_list(:snippet, 10)}

    it 'renders a all snippets response' do
      get snippets_url
      expect(response).to be_successful
    end

    it 'be return all snippets with paginate' do
      get snippets_url,
          params: { page: 2, per_page: 5 }

      expect(response).to be_successful
    end
  end

  describe 'GET /show' do
    let!(:snippet) { create(:snippet)}

    it 'renders a successful response' do
      get snippet_url(snippet)
      expect(response).to be_successful
    end
  end

  describe 'POST /create' do
    context 'with valid parameters' do
      let(:text) { 'How to go to the moon' }
      let(:summary) { 'With Tesla' }
      let(:service_result) { instance_double('Result', to_h: { text: text, summary: summary }) }

      before do
        allow(GenerateSnippet::SummaryAiService).to receive(:call).with(text).and_return(service_result)
      end


      it 'creates a new Snippet' do
        expect {
          post snippets_url, params: { snippet: { text: text }}
        }.to change(Snippet, :count).by(1)
      end

      it 'renders a response with 201 status' do
        post snippets_url, params: { snippet: { text: text }}
        expect(response).to have_http_status(:created)
      end
    end

    context 'with invalid parameters' do
      let(:text) { nil }
      let(:service_result) { nil }
      before(:each) do
        allow(GenerateSnippet::SummaryAiService).to receive(:call).with(text).and_return(service_result)
      end

      it 'does not create a new Snippet' do
        expect {
          post snippets_url, params: { snippet: { text: text }}
        }.to change(Snippet, :count).by(0)
      end

      it 'renders a response with 422 status' do
        post snippets_url, params: { snippet: { text: text }}
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end
