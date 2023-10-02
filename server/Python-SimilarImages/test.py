
import json

a = '{"count": "4","images": {"1": "dasasda.png","2": "safsfsa.png","3": "fqfqwfq.png","4": "fadas.png"}}'
# a = a.json
d = json.loads(a)
print(d)
print(type(d))
