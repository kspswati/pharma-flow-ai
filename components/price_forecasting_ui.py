import streamlit as st
import pandas as pd
import plotly.express as px
from utils.price_forecasting import preprocess_dataframe_for_forecast, prepare_timeseries_data, forecast_unit_price

def render_price_forecasting_tab(df):
    st.header("📈 Pharma Price Forecasting")

    required_cols = {
        "Product Group", "Country", "Vendor", "Shipment Mode",
        "Manufacturing Site", "Dosage Form", "Sub Classification",
        "Delivered to Client Date", "Unit Price"
    }
    if not required_cols.issubset(df.columns):
        st.error("Required columns are missing from the dataset!")
        st.stop()

    # --- Mandatory Filters ---
    product_group = st.selectbox("Select Product Group", sorted(df["Product Group"].dropna().unique()))
    df_filtered_pg = df[df["Product Group"] == product_group]

    country = st.selectbox("Select Country", sorted(df_filtered_pg["Country"].dropna().unique()))
    df_filtered_country = df_filtered_pg[df_filtered_pg["Country"] == country]

    # --- Optional Filters (MultiSelects with Select All) ---
    vendor_options = ["Select All"] + sorted(df_filtered_country["Vendor"].dropna().unique())
    vendor = st.multiselect("Select Vendor(s)", vendor_options, default=["Select All"])

    shipment_mode_options = ["Select All"] + sorted(df_filtered_country["Shipment Mode"].dropna().unique())
    shipment_mode = st.multiselect("Select Shipment Mode(s)", shipment_mode_options, default=["Select All"])

    manufacturing_site_options = ["Select All"] + sorted(df_filtered_country["Manufacturing Site"].dropna().unique())
    manufacturing_site = st.multiselect("Select Manufacturing Site(s)", manufacturing_site_options, default=["Select All"])

    dosage_form_options = ["Select All"] + sorted(df_filtered_country["Dosage Form"].dropna().unique())
    dosage_form = st.multiselect("Select Dosage Form(s)", dosage_form_options, default=["Select All"])

    subclass_options = ["Select All"] + sorted(df_filtered_country["Sub Classification"].dropna().unique())
    sub_classification = st.multiselect("Select Sub Classification(s)", subclass_options, default=["Select All"])

    forecast_weeks = st.selectbox("Select Number of Weeks to Forecast", [1, 2, 3, 4, 5, 6])

    # --- Final Filtering ---
    final_df = df_filtered_country.copy()

    if "Select All" not in vendor:
        final_df = final_df[final_df["Vendor"].isin(vendor)]
    if "Select All" not in shipment_mode:
        final_df = final_df[final_df["Shipment Mode"].isin(shipment_mode)]
    if "Select All" not in manufacturing_site:
        final_df = final_df[final_df["Manufacturing Site"].isin(manufacturing_site)]
    if "Select All" not in dosage_form:
        final_df = final_df[final_df["Dosage Form"].isin(dosage_form)]
    if "Select All" not in sub_classification:
        final_df = final_df[final_df["Sub Classification"].isin(sub_classification)]

    # --- Forecast Button ---
    if st.button("Generate Forecast"):
        with st.spinner("Processing and forecasting future prices..."):

            if final_df.empty:
                st.warning("No data available for the selected combination.")
                return

            if len(final_df) < 10:
                st.error("Not enough historical data for reliable forecasting. Please choose a broader combination.")
                return
            elif len(final_df) < 20:
                st.warning(f"⚠️ Warning: Only {len(final_df)} rows available after filtering. Forecast may be less reliable.")

            # Clean after selection
            cleaned_df = preprocess_dataframe_for_forecast(final_df)

            # Prepare timeseries
            ts_df = prepare_timeseries_data(cleaned_df, date_col="Delivered to Client Date")

            try:
                history, forecast, metrics = forecast_unit_price(ts_df, forecast_weeks)
                display_forecast_results(history, forecast, metrics, product_group, country, forecast_weeks)
                display_unit_price_seasonality(cleaned_df)

            except Exception as e:
                st.error(f"Forecasting failed: {e}")

def display_forecast_results(history, forecast, metrics, product_group, country, forecast_weeks):
    st.subheader(f"Price Forecast for {product_group} in {country} (Next {forecast_weeks} Weeks)")

    # Set forecast index to continue from last history date
    forecast_index = pd.date_range(start=history.index[-1] + pd.Timedelta(days=7), periods=len(forecast), freq='W')
    forecast.index = forecast_index

    combined_df = pd.concat([history, forecast.to_frame("Forecasted Price")])

    fig = px.line(
        combined_df,
        y=["Unit Price", "Forecasted Price"] if "Forecasted Price" in combined_df.columns else ["Unit Price"],
        title=f"Forecasted Unit Price Trend for {product_group} in {country} (Next {forecast_weeks} Weeks)"
    )
    fig.update_layout(
        yaxis_title="Unit Price (USD)",
        xaxis_title="Week",
        xaxis_range=[combined_df.index.min(), combined_df.index.max()]  # ✅ Now safe
    )
    st.plotly_chart(fig, use_container_width=True)

    st.subheader("Forecasted Prices")
    forecast_df = forecast.to_frame("Predicted Unit Price (USD)").round(2)
    st.dataframe(forecast_df)

    avg_price = history["Unit Price"].mean()
    volatility = history["Unit Price"].std() / avg_price * 100
    min_price = history["Unit Price"].min()
    max_price = history["Unit Price"].max()


    st.subheader("Summary Statistics")
    col1, col2 = st.columns(2)
    with col1:
        st.metric("Average Historical Price", f"${avg_price:.2f}")
    with col2:
        st.metric("Price Volatility", f"{volatility:.2f}%")

    col3, col4 = st.columns(2)
    with col3:
        st.metric("Min Price", f"${min_price:.2f}")
    with col4:
        st.metric("Max Price", f"${max_price:.2f}")

    if metrics:
        st.subheader("Model Evaluation Metrics")
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric("Mean Absolute Error (MAE)", f"${metrics['mae']:.2f}")
        with col2:
            st.metric("Root Mean Squared Error (RMSE)", f"${metrics['rmse']:.2f}")

def display_unit_price_seasonality(filtered_df):
    st.subheader("💰 Monthly Seasonality: Avg Unit Price")

    if "Delivered to Client Date" not in filtered_df.columns:
        st.warning("Delivered to Client Date column missing.")
        return

    # Handle both possible unit price columns
    unit_price_col = "Unit Price (USD)" if "Unit Price (USD)" in filtered_df.columns else "Unit Price"
    if unit_price_col not in filtered_df.columns:
        st.warning("Unit Price column missing.")
        return

    filtered_df["Delivered to Client Date"] = pd.to_datetime(
        filtered_df["Delivered to Client Date"], errors='coerce'
    )
    filtered_df = filtered_df.dropna(subset=["Delivered to Client Date", unit_price_col])
    filtered_df["Month_Num"] = filtered_df["Delivered to Client Date"].dt.month
    filtered_df["Month"] = filtered_df["Delivered to Client Date"].dt.month_name()

    monthly_data = (
        filtered_df.groupby(["Month_Num", "Month", filtered_df["Delivered to Client Date"].dt.year])[unit_price_col]
        .mean()
        .reset_index(name="Avg Unit Price")
    )

    seasonal_price = (
        monthly_data.groupby(["Month_Num", "Month"])["Avg Unit Price"]
        .mean()
        .reset_index()
        .sort_values("Month_Num")
    )

    fig = px.line(
        seasonal_price,
        x="Month",
        y="Avg Unit Price",
        markers=True,
        title="Monthly Seasonality: Avg Unit Price"
    )
    fig.update_layout(xaxis_title="Month", yaxis_title="Avg Unit Price", hovermode="x unified")
    st.plotly_chart(fig, use_container_width=True)
