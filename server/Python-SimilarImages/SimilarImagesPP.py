
from DeepImageSearch import Load_Data, Search_Setup
from CollegeCreater import create_photo_collage
import json

# All Images paths add here
# Set up the search engine, You can load 'vit_base_patch16_224_in21k', 'resnet50' etc more then 500+ models
imgFolderList = ["data/IMAGES/ido", "data/IMAGES/inf", "data/IMAGES/kwm", "data/IMAGES/pev",
                 "data/IMAGES/uxq", "data/IMAGES/yaj", "data/IMAGES/zrc"]

# print(image_list)

# # Add new images to the index
# # st.add_images_to_index(['image_path_1', 'image_path_2'])
for imgFolder in imgFolderList:
    image_list = Load_Data().from_folder(folder_list=[imgFolder])
    st = Search_Setup(image_list=image_list, model_name='vgg19',
                      pretrained=True, image_count=100)

    # Index the images
    st.run_index()

    # Get metadata
    # metadata = st.get_image_metadata_file()
    dis = {}
    for i in image_list:
        # Get similar images
        SimilarImagesList = st.get_similar_images(
            image_path=i, number_of_images=10)
        dis[f'{i.split("/")[-1].split(".")[0]}'] = f'{SimilarImagesList.keys()}'
        # Specify the name of the JSON file where you want to save the dictionary
        # json_file_name = f'{i.split("/")[-1].split(".")[0]}.json'
    # Use json.dump() to save the dictionary to the JSON file
    # print(dis)
    print(f"Done with loop saveing result to {imgFolder.split('/')[-1]}.json")
    with open(f'result/{imgFolder.split("/")[-1]}.json', "w") as json_file:
        json.dump(dis, json_file)


# print(dis)
# # create a college
# create_photo_collage(image_dict=SimilarImagesList, collage_size=(550, 500),
#                      output_filename="pyCollege.jpg")
# # Plot similar images
# # st.plot_similar_images(image_path='image_path', number_of_images=9)
# # print(st.plot_similar_images(image_path='test/zrc7jwW0GI3SM.png', number_of_images=9))
# Update metadata
# metadata = st.get_image_metadata_file()
