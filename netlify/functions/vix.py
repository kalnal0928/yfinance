import json
import requests

def handler(event, context):
    try:
        # 테스트용 공개 API (JSONPlaceholder)
        response = requests.get("https://jsonplaceholder.typicode.com/todos/1")
        response.raise_for_status()  # 에러가 있으면 예외 발생
        data = response.json()
        
        # 실제 데이터 대신 테스트용 데이터 구조로 응답
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': json.dumps({'price': data['id']}) # id 값을 price로 사용
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }