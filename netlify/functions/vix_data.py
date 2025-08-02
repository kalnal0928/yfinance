import json
import yfinance as yf

def handler(event, context):
    try:
        vix = yf.Ticker("^VIX")
        hist = vix.history(period="1d")
        latest_close = hist['Close'].iloc[-1]
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': json.dumps({'price': latest_close})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
