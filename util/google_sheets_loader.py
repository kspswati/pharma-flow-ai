import gspread
import pandas as pd
from oauth2client.service_account import ServiceAccountCredentials

# ---------------------------------------------
# 🔄 Load existing records
# ---------------------------------------------
def load_data_from_sheets():
    scope = ["https://spreadsheets.google.com/feeds",
             "https://www.googleapis.com/auth/drive"]
    creds = ServiceAccountCredentials.from_json_keyfile_name(
        "service_account.json", scope)
    client = gspread.authorize(creds)

    sheet = client.open("Supply_Chain_Data").sheet1
    data = sheet.get_all_records()

    df = pd.DataFrame(data)
    df.columns = df.columns.str.strip()

    date_columns = [
        "PQ First Sent to Client Date",
        "PO Sent to Vendor Date",
        "Scheduled Delivery Date",
        "Delivered to Client Date",
        "Delivery Recorded Date"
    ]
    for col in date_columns:
        if col in df.columns:
            df[col] = pd.to_datetime(df[col], errors="coerce")

    num_columns = ["Weight (Kilograms)", "Freight Cost (USD)"]
    for col in num_columns:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors="coerce")

    return df, date_columns

# ---------------------------------------------
# ➕ Append new row to Google Sheet
# ---------------------------------------------
def append_row_to_sheet(row):
    try:
        scope = ["https://spreadsheets.google.com/feeds",
                 "https://www.googleapis.com/auth/drive"]
        creds = ServiceAccountCredentials.from_json_keyfile_name("service_account.json", scope)
        client = gspread.authorize(creds)

        sheet = client.open_by_key("1bFSmd406F180Xr0kjQqkNj0oEVhKkXTkgfmOO19EsXw").sheet1
        sheet.append_row(row)
        return True
    except Exception as e:
        print("Error appending to sheet:", e)
        return False
