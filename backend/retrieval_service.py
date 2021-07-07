#!/usr/bin/env python3

def retrieve_df(data):
    ## requried information/features types
    datatype = "total"

    df = data.iloc[:100,:]

    ## extract information/features
    # get active cases
    if datatype == 'active':
        active_df = df[df['active'] != 0]
        out_df = active_df[['postcode', 'active']]
    # get total cases
    elif datatype == 'total':
        total_df = df[df['cases'] != 0]
        out_df = total_df[['postcode', 'cases']]
    # others information and features

    out_df.columns = ['postcode', 'frequency']

    return out_df
