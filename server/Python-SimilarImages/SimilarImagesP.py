import numpy as np  # linear algebra
import pandas as pd  # data processing, CSV file I/O (e.g. pd.read_csv)
# from DeepImageSearch import Index, LoadData, SearchImage
from DeepImageSearch import Load_Data, Search_Setup

# All Images paths add here
code = "data/"
# image_list = LoadData().from_folder(folder_list=['data/'])
# Index(image_list+image_list).Start()

# Set up the search engine, You can load 'vit_base_patch16_224_in21k', 'resnet50' etc more then 500+ models
image_list = Load_Data().from_folder(['data/'])
st = Search_Setup(image_list=image_list, model_name='vgg19',
                  pretrained=True, image_count=100)

# Index the images
st.run_index()

# Get metadata
metadata = st.get_image_metadata_file()

# Add new images to the index
st.add_images_to_index(['image_path_1', 'image_path_2'])

# Get similar images
st.get_similar_images(image_path='image_path', number_of_images=10)

# Plot similar images
st.plot_similar_images(image_path='image_path', number_of_images=9)

# Update metadata
metadata = st.get_image_metadata_file()
# print("\n ******in SimilarImages file******** \n")
# Functions

# for i in image_list:
#     print(i)
# Load images from a folder
# image_list = LoadData().from_folder(folder_list=['data/'])


# def getSimilarImages(lst, n=6):
#     result = {}
#     for no, img in lst.items():
#         print(f'\n no = {no} and imgNmae = {img}\n')
#         indx = image_list.index(f'{code}{img}')
#         imgLst = SearchImage().get_similar_images(
#             image_path=image_list[indx], number_of_images=5)
#         result[img] = imgLst
#     return result


# # for i in image_list:
# #     print(i)

# print(len(image_list))
# a = SearchImage().get_similar_images(
#     image_path=image_list[0], number_of_images=5)
# print(a)
