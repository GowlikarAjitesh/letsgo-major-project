import pandas as pd

def get_city_data(city_name):
    # Load the places and restaurants datasets
    places_df = pd.read_csv('Places.csv')
    restaurants_df = pd.read_csv('restaurants.csv')

    # Filter places dataframe for the specified city
    city_places = places_df[places_df['City'] == city_name]

    # Filter restaurants dataframe for the specified city
    city_restaurants = restaurants_df[ ['City'] == city_name]

    return city_places, city_restaurants

# Example usage:
city_name = 'Hyderabad'  # Replace with desired city name
city_places, city_restaurants = get_city_data(city_name)

# Print the first few rows of city places
print("Places in", city_name)
print(city_places.head())

# Print the first few rows of city restaurants
print("\nRestaurants in", city_name)
print(city_restaurants.head())
