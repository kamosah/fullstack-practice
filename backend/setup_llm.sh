#!/bin/bash

# Setup script for LiteLLM + Grok Cloud integration
# This script helps you set up the .env file with the required configuration

echo "🚀 Setting up LiteLLM + Grok Cloud Integration"
echo "============================================="

# Check if .env already exists
if [ -f ".env" ]; then
    echo "⚠️  .env file already exists. Creating backup as .env.backup"
    cp .env .env.backup
fi

# Create .env from template
echo "📝 Creating .env file from template..."
cp .env.example .env

echo ""
echo "📋 Configuration required:"
echo ""
echo "1. Get your Grok API key from https://x.ai"
echo "2. Edit the .env file and replace 'your_grok_api_key_here' with your actual API key"
echo ""
echo "Current .env file contents:"
echo "=========================="
cat .env
echo "=========================="
echo ""

# Check if user has an API key ready
read -p "Do you have your Grok API key ready? (y/n): " has_key

if [ "$has_key" = "y" ] || [ "$has_key" = "Y" ]; then
    echo ""
    read -p "Enter your Grok API key: " api_key
    
    # Update the .env file with the actual API key
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/your_grok_api_key_here/$api_key/" .env
    else
        # Linux
        sed -i "s/your_grok_api_key_here/$api_key/" .env
    fi
    
    echo "✅ API key configured successfully!"
    echo ""
    echo "🧪 Testing the integration..."
    python test_llm_integration.py
else
    echo ""
    echo "📝 Next steps:"
    echo "1. Get your API key from https://x.ai"
    echo "2. Edit .env file: LITELLM_API_KEY=your_actual_api_key"
    echo "3. Run: python test_llm_integration.py"
    echo "4. Start the backend: poetry run uvicorn app.main:app --reload"
fi

echo ""
echo "🎉 Setup complete!"
echo "To start the application:"
echo "  Backend: poetry run uvicorn app.main:app --reload"
echo "  Frontend: cd ../frontend && npm run dev"
