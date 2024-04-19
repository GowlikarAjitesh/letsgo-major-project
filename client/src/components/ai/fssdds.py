import pandas as pd
import numpy as np

# Read each CSV file into a Pandas DataFrame
df_city_states = pd.read_csv("city_states.csv")
df_City = pd.read_csv("City.csv")
df_goibibo = pd.read_csv("goibibo_com-travel_sample.csv")
df_indian_food = pd.read_csv("indian_food.csv")
df_locations = pd.read_csv("locations.csv")
df_Places = pd.read_csv("Places.csv")
df_ratings = pd.read_csv("ratingswithcontextandmetadata.csv")
df_restaurants = pd.read_csv("restaurants.csv")
print("Endd")