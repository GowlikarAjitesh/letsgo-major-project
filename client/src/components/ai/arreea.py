import pandas as pd
import numpy as np

# Read each CSV file into a Pandas DataFrame separately
df_city_states = pd.read_csv("city_states.csv")
print("\nHeadings for city_states.csv:")
print(df_city_states.columns)

df_City = pd.read_csv("City.csv")
print("\nHeadings for City.csv:")
print(df_City.columns)

df_goibibo = pd.read_csv("goibibo_com-travel_sample.csv")
print("\nHeadings for goibibo_com-travel_sample.csv:")
print(df_goibibo.columns)

df_indian_food = pd.read_csv("indian_food.csv")
print("\nHeadings for indian_food.csv:")
print(df_indian_food.columns)

df_locations = pd.read_csv("locations.csv")
print("\nHeadings for locations.csv:")
print(df_locations.columns)

df_Places = pd.read_csv("Places.csv")
print("\nHeadings for Places.csv:")
print(df_Places.columns)

df_ratings = pd.read_csv("ratingswithcontextandmetadata.csv")
print("\nHeadings for ratingswithcontextandmetadata.csv:")
print(df_ratings.columns)

df_restaurants = pd.read_csv("restaurants.csv")
print("\nHeadings for restaurants.csv:")
print(df_restaurants.columns)

print("\nEnd")
