import base64

def image_to_base64(image_path)->str:
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

# Example usage
image_path = '/Users/syphonphilter/Desktop/1test.png'
image_base64 = image_to_base64(image_path)
print(image_base64)
