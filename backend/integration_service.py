#!/usr/bin/env python3
import pgeocode
import pandas as pd
import json
import numpy
from geojson import Feature, FeatureCollection, Point


def long_lat(zipcode):
    """
    function for longtitude and latitude
    input: zipcode (int)
    output: (longtitude, latitude)
    """
    nomi = pgeocode.Nominatim('au')
    return tuple(nomi.query_postal_code(str(zipcode)).loc[['longitude', 'latitude']])


def to_geojson(df: pd.DataFrame) -> str:
    """
    Converts the DataFrame into GeoJSON format.

    input: DataFrame.
    output: String containing an equivalent GeoJSON FeatureCollection.

    note: Ensure that all postcodes are valid, otherwise this function will not work
    """
    features = []

    #print("called")


    insert_features = lambda row: features.append(
        Feature(geometry=Point(long_lat(row["postcode"])),
                properties=dict(id=str(row["postcode"]),
                                frequency=str(row["frequency"]))
    ))

    #print("df about to be applied")
    df.apply(insert_features, axis=1)

    print(features)

    return FeatureCollection(features)
