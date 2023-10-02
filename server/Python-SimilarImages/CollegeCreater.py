from PIL import Image
import os
import json


def create_photo_collage(image_dict, output_filename, image_size=(100, 100), collage_size=(800, 800), padding=10):
    images = []
    max_width, max_height = 0, 0

    for key, file_path in image_dict.items():
        if not os.path.isfile(file_path):
            print(
                f"Warning: '{file_path}' is not a valid image file path. Skipping.")
            continue

        image = Image.open(file_path)
        image = image.resize(image_size)  # Resize each image to 100x100 pixels
        max_width = max(max_width, image.width)
        max_height = max(max_height, image.height)
        images.append(image)

    if not images:
        print("No valid images found in the list.")
        return

    collage = Image.new('RGB', collage_size, (255, 255, 255))

    x, y = 0, 0
    for image in images:
        collage.paste(image, (x, y))
        x += max_width + padding
        if x + max_width > collage_size[0]:
            x = 0
            y += max_height + padding

    collage.save(output_filename)


if __name__ == "__main__":
    # JSON data with numerical keys and file paths
    # SimilarImagesList = {
    #     7: 'test/zrc7jwW0GI3SM.png',
    #     34: 'test/zrcMYq1rlOHng.png',
    #     43: 'test/zrc2MZZY2vSn5.png',
    #     25: 'test/zrcqQkR0CP9gk.png',
    #     38: 'test/zrcSDyUPKOAn3.png',
    #     3: 'test/zrcDoqbRn4RSM.png',
    #     0: 'test/zrciF357bmgDC.png',
    #     6: 'test/zrcwEm2wo3CR7.png',
    #     19: 'test/zrcYg0nkaQdQq.png',
    #     40: 'test/zrcksd2nCb074.png'
    # }

    # # Output collage file name
    # output_filename = "photo_collage.jpg"

    # # Specify the desired image size
    # image_size = (100, 100)

    create_photo_collage()
