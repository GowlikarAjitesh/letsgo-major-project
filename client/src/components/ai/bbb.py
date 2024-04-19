import pandas as pd

# Load the datasets
city_states_df = pd.read_csv('city_states.csv')
city_df = pd.read_csv('City.csv')
goibibo_df = pd.read_csv('goibibo_com-travel_sample.csv')
indian_food_df = pd.read_csv('indian_food.csv')
locations_df = pd.read_csv('locations.csv')
places_df = pd.read_csv('Places.csv')
ratings_df = pd.read_csv('ratingswithcontextandmetadata.csv')
restaurants_df = pd.read_csv('restaurants.csv')

# Specify the city you want to create the dataset for
target_city = 'New York'  # Replace 'New York' with the desired city name

# Extract information based on the target city
city_states_info = city_states_df[city_states_df['name_of_city'] == target_city]
city_info = city_df[city_df['City'] == target_city]
goibibo_info = goibibo_df[goibibo_df['city'] == target_city]
indian_food_info = indian_food_df[indian_food_df['state'] == target_city]  # Assuming 'state' contains city information
locations_info = locations_df[locations_df['city'] == target_city]
places_info = places_df[places_df['City'] == target_city]
# ratings_info = ratings_df[ratings_df['additional_info'].str.contains(target_city)]
restaurants_info = restaurants_df[restaurants_df['City'] == target_city]

# Concatenate or merge the extracted information into a single dataset
city_dataset = pd.concat([city_states_info, city_info, goibibo_info, indian_food_info, locations_info, places_info,restaurants_info], axis=1)

# Save or further process the city dataset
city_dataset.to_csv('city_dataset.csv', index=False)
print("Headings of the final dataset:")
print(city_dataset.columns)

# Print the first few rows of the final dataset
print("\nData of the final dataset:")
print(city_dataset.head())