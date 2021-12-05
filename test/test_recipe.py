import requests

def test_get_result():
    result = requests.get("http://localhost:5000/api/v1/recipes")
    assert result is not None

def test_get_result_status():
    result = requests.get("http://localhost:5000/api/v1/recipes")
    assert result.status_code == 200